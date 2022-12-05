import {
  Center,
  Flex,
  IconButton,
  Spinner,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import { User } from '@prisma/client'
import { ArrowCounterClockwise } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { DashboardHeader } from '../../components/pages/Dashboard/DashboardHeader'
import { NotAllowed } from '../../components/NotAllowed'
import { ManageUsersTable } from '../../components/pages/manageUsers/ManageUsersTable'
import { Search } from '../../components/Search'
import { trpc } from '../../utils/trpc'
import { PaginationButtons } from '@root/components/PaginationButtons'
import { PaginationPageInfo } from '@root/components/PaginationPageInfo'
import { useFilter, useDebouncedQuery, useLoggedInfo } from '@root/hooks'

export default function ManageUsers() {
  const { userInfo, isAdmin, isLoading } = useLoggedInfo()
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [page, setPage] = useState(1)

  // debounce effect when searching
  const { debounced, query } = useDebouncedQuery()
  const { filter, handleFilterChange } = useFilter()

  const backgroundColor = useColorModeValue('gray.100', '')

  const [users, setUsers] = useState([] as User[])
  const [lastAvailablePage, setLastAvailablePage] = useState(1)
  const infiniteUsers = trpc.user.getInfiniteUsers.useInfiniteQuery(
    {
      limit: itemsPerPage,
      query,
      filter,
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (lastPage) => {
        if (page === 1) {
          setUsers(lastPage.pages[0]?.items as User[])
        }
      },
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      keepPreviousData: true,
    },
  )

  useEffect(() => {
    if (page > 0) {
      setUsers(infiniteUsers.data?.pages[page - 1]?.items as User[])
    }
  }, [infiniteUsers.data?.pages, page])

  const hasMorePages = infiniteUsers.hasNextPage || lastAvailablePage > page

  // only admins can manage users permissions for security reasons
  if (!isAdmin) {
    return <NotAllowed isModerator={userInfo?.permission === 'moderator'} />
  }

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    )
  }

  const handleGotoPrevPage = () => {
    if (page <= 0) return

    setPage((prev) => prev - 1)
  }

  const handleGotoNextPage = () => {
    infiniteUsers.fetchNextPage()
    if (!hasMorePages) return

    setPage((page) => page + 1)
    setLastAvailablePage(page + 1)
  }

  return (
    <>
      <DashboardHeader permission={userInfo?.permission} />
      <Center
        minH="calc(100vh - 72px)"
        display="flex"
        flexDirection="column"
        bg={backgroundColor}
      >
        <Stack w="1300px" maxW="100%" mx="auto">
          <Search
            filterField={filter.field}
            handleFilterChange={handleFilterChange}
            handleChangeQuery={debounced}
          />

          <ManageUsersTable users={users} />

          <Flex justify="space-between" w="1200px" maxW="100%">
            <PaginationPageInfo
              itemsPerPage={itemsPerPage}
              changeItemsPerPage={(value) => setItemsPerPage(value)}
            />

            <IconButton
              size="sm"
              icon={<ArrowCounterClockwise />}
              aria-label="Refetch data"
              justifySelf="flex-end"
              ml="auto"
              mr="2"
              onClick={() => infiniteUsers.refetch()}
              isLoading={infiniteUsers.isRefetching || infiniteUsers.isLoading}
            />

            <PaginationButtons
              currentPage={page}
              hasMorePages={hasMorePages}
              handleGotoPrevPage={handleGotoPrevPage}
              handleGotoNextPage={handleGotoNextPage}
            />
          </Flex>
        </Stack>
      </Center>
    </>
  )
}
