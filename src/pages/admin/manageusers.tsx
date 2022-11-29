import {
  ButtonGroup,
  Center,
  Flex,
  FormLabel,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spinner,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import { User } from '@prisma/client'
import { useRouter } from 'next/router'
import { ArrowCounterClockwise, CaretLeft, CaretRight } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { DashboardHeader } from '../../components/pages/Dashboard/DashboardHeader'
import { NotAllowed } from '../../components/NotAllowed'
import { ManageUsersTable } from '../../components/pages/manageUsers/ManageUsersTable'
import { Search } from '../../components/Search'
import { stringOrNull } from '../../utils/stringOrNull'
import { trpc } from '../../utils/trpc'
import { useLoggedInfo } from '../../hooks/useLoggedInfo'
import { useDebounceQuery } from '../../hooks/useDebounceQuery'

export default function ManageUsers() {
  const { userInfo, isAdmin, isLoading } = useLoggedInfo()
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [page, setPage] = useState(1)

  // debounce effect when searching
  const { changeQuery, changeFilter, filterState } = useDebounceQuery()

  const backgroundColor = useColorModeValue('gray.100', '')

  const router = useRouter()
  // We pick the current query string from the router instead of `useState()`
  // Allows for reloading the page to see the same search results & to link to it
  const q = stringOrNull(router.query.q)?.trim()

  const [users, setUsers] = useState([] as User[])
  const [lastAvailablePage, setLastAvailablePage] = useState(1)
  const infiniteUsers = trpc.user.getInfiniteUsers.useInfiniteQuery(
    {
      limit: itemsPerPage,
      query: q,
      filter: filterState.filter,
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

  const permissionMutate = trpc.user.changePermission.useMutation()

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
            currentQuery={filterState.query}
            changeQuery={changeQuery}
            filter={filterState.filter}
            changeFilter={changeFilter}
          />

          <ManageUsersTable users={users} permissionMutate={permissionMutate} />

          <Flex justify="space-between" w="1200px" maxW="100%">
            <Flex justify="center" alignItems="center">
              <FormLabel>Itens por página</FormLabel>
              <NumberInput
                w="20"
                defaultValue={itemsPerPage}
                min={1}
                max={20}
                value={itemsPerPage}
                onChange={(_, valueAsNumber) => setItemsPerPage(valueAsNumber)}
                size="sm"
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>
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

            <ButtonGroup size="sm">
              <IconButton
                as={CaretLeft}
                disabled={page === 1}
                cursor="pointer"
                onClick={() => {
                  setPage((page) => {
                    return page > 1 ? page - 1 : page
                  })
                }}
                aria-label="Previous page icon"
              />
              <IconButton
                as={CaretRight}
                disabled={!hasMorePages}
                cursor="pointer"
                onClick={() => {
                  infiniteUsers.fetchNextPage()

                  if (hasMorePages) {
                    setPage((page) => page + 1)
                    setLastAvailablePage(page + 1)
                  }
                }}
                aria-label="Next page icon"
              />
            </ButtonGroup>
          </Flex>
        </Stack>
      </Center>
    </>
  )
}
