import {
  Box,
  Center,
  Flex,
  IconButton,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import { RegisteredUser } from '@prisma/client'
import { PaginationButtons } from '@root/components/PaginationButtons'
import { PaginationPageInfo } from '@root/components/PaginationPageInfo'
import { Search } from '@root/components/Search'
import { trpc } from '@root/utils/trpc'
import { ArrowCounterClockwise } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { DashboardTable } from './DashboardTable'
import { useDebouncedQuery, useFilter } from '../../../hooks'

interface DashboardContentProps {
  isAdmin: boolean
}

export const DashboardContent = ({ isAdmin }: DashboardContentProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  // Dark and Light mode colors
  const borderColor = useColorModeValue('gray.100', 'gray.700')
  const backgroundColor = useColorModeValue('gray.100', '')

  const [lastAvailablePage, setLastAvailablePage] = useState(1)

  const { debounced, query: querySt } = useDebouncedQuery()
  const { filter, handleFilterChange } = useFilter()

  const infiniteUsers: any = trpc.registeredUser.infiniteUsers.useInfiniteQuery(
    {
      limit: itemsPerPage,
      query: querySt,
      filter,
    },
    {
      refetchOnWindowFocus: false,

      onSuccess: (lastPage) => {
        if (currentPage === 1) {
          return setUsersToShow(lastPage.pages[0]?.items as RegisteredUser[])
        }
      },

      getNextPageParam: (lastPage) => lastPage.nextCursor,

      keepPreviousData: true,
    },
  )

  const hasMorePages =
    infiniteUsers.hasNextPage ||
    currentPage < lastAvailablePage ||
    infiniteUsers.data?.pages.length - currentPage > 0

  useEffect(() => {
    if (currentPage > 0) {
      setUsersToShow(
        infiniteUsers.data?.pages[currentPage - 1]?.items as RegisteredUser[],
      )
    }
  }, [infiniteUsers.data?.pages, currentPage])

  const [usersToShow, setUsersToShow] = useState<RegisteredUser[]>(
    infiniteUsers.data?.pages[0]?.items as RegisteredUser[],
  )

  function resetPage() {
    setCurrentPage(1)
    setLastAvailablePage(1)
  }

  function handleGotoNextPage() {
    if (currentPage < lastAvailablePage) {
      return setCurrentPage((page) => page + 1)
    }

    if (hasMorePages) {
      infiniteUsers.fetchNextPage()
      setCurrentPage((page) => {
        if (page + 1 > lastAvailablePage) {
          setLastAvailablePage(page + 1)
        }
        return page + 1
      })
    }
  }

  function handleGotoPrevPage() {
    setCurrentPage((page) => {
      if (page > 1) {
        return page - 1
      }
      return page
    })
  }

  return (
    <Center
      minH="calc(100vh - 72px)"
      display="flex"
      flexDirection="column"
      bg={backgroundColor}
    >
      <Stack w="1200px" maxW="100%" mx="auto">
        <Search
          handleChangeQuery={debounced}
          filterApproval={filter.approval}
          filterField={filter.field}
          handleFilterChange={handleFilterChange}
        />
        <Box
          maxW="100%"
          w="1200px"
          border="1px"
          rounded="md"
          borderColor={borderColor}
        >
          <DashboardTable
            setUsersToShow={setUsersToShow}
            usersToShow={usersToShow}
            isAdmin={isAdmin}
          />
        </Box>
        <Flex justify="space-between" w="1200px" maxW="100%" mt="2">
          <PaginationPageInfo
            changeItemsPerPage={(value) => setItemsPerPage(value)}
            itemsPerPage={itemsPerPage}
            resetPage={resetPage}
          />

          <IconButton
            size="sm"
            icon={<ArrowCounterClockwise />}
            aria-label="Refetch data"
            justifySelf="flex-end"
            ml="auto"
            mr="2"
            onClick={() =>
              infiniteUsers.refetch({
                // typing not being assured because of inifiniteUsers not being
                // typed properly for some reason
                refetchPage: (_: any, index: number) =>
                  index === currentPage - 1,
              })
            }
            isLoading={infiniteUsers.isRefetching || infiniteUsers.isLoading}
          />
          <PaginationButtons
            currentPage={currentPage}
            handleGotoNextPage={handleGotoNextPage}
            handleGotoPrevPage={handleGotoPrevPage}
            hasMorePages={hasMorePages}
          />
        </Flex>
      </Stack>
    </Center>
  )
}
