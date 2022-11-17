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
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ArrowCounterClockwise, CaretLeft, CaretRight } from 'phosphor-react'
import { useEffect, useReducer, useState } from 'react'
import { DashboardHeader } from '../../components/pages/Dashboard/DashboardHeader'
import { NotAllowed } from '../../components/NotAllowed'
import { ManageUsersTable } from '../../components/pages/manageUsers/ManageUsersTable'
import { Search } from '../../components/Search'
import { TFilter } from '../../../@types/queryFilter'
import { stringOrNull } from '../../utils/stringOrNull'
import { trpc } from '../../utils/trpc'
import {
  filterReducer,
  initialState,
  QueryAction,
} from '@root/reducers/queryReducer'

export type TUserPossiblePermissions = 'admin' | 'moderator' | 'none'
export const canSeeDashboard = (
  permission: TUserPossiblePermissions,
): boolean => permission === 'admin' || permission === 'moderator'

export default function ManageUsers() {
  const { data, status } = useSession()
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [filterState, dispatch] = useReducer(filterReducer, initialState)
  const [page, setPage] = useState(1)

  const backgroundColor = useColorModeValue('gray.100', '')

  const router = useRouter()
  // We pick the current query string from the router instead of `useState()`
  // Allows for reloading the page to see the same search results & to link to it
  const q = stringOrNull(router.query.q)?.trim()

  const userInfo = trpc.useQuery(
    ['openUser.getUserInfo', { id: String(data?.user?.id) }],
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    },
  )
  const [users, setUsers] = useState([] as User[])
  const [lastAvailablePage, setLastAvailablePage] = useState(1)
  const infiniteUsers = trpc.useInfiniteQuery(
    [
      'protectedUser.getInfiniteUsers',
      { limit: itemsPerPage, query: q, filter: filterState.filter },
    ],
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

  // debounce effect when searching
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (router.query.q === filterState.query) return

      router.push(
        {
          query: {
            ...router.query,
            q: filterState.query,
          },
        },
        undefined,
        {
          shallow: true,
          scroll: false,
        },
      )
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [router, filterState.query])

  const permissionMutate = trpc.useMutation([
    'protectedUser.changeUserPermission',
  ])

  const hasMorePages = infiniteUsers.hasNextPage || lastAvailablePage > page

  // only admins can manage users permissions for security reasons
  if (
    (userInfo.data?.permission !== 'admin' && status !== 'loading') ||
    (!data && status !== 'loading')
  ) {
    return (
      <NotAllowed isModerator={userInfo.data?.permission === 'moderator'} />
    )
  }

  function handleQueryChange(newQuery: string) {
    dispatch({
      type: QueryAction.SET_QUERY,
      payload: { ...filterState, query: newQuery },
    })
  }

  function handleFilterChange(filter: TFilter) {
    dispatch({
      type: QueryAction.SET_FILTER,
      payload: { ...filterState, filter },
    })
  }

  if (status === 'loading') {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    )
  }

  return (
    <>
      <DashboardHeader permission={userInfo.data?.permission} />
      <Center
        minH="calc(100vh - 72px)"
        display="flex"
        flexDirection="column"
        bg={backgroundColor}
      >
        <Stack w="1300px" maxW="100%" mx="auto">
          <Search
            currentQuery={filterState.query}
            changeQuery={handleQueryChange}
            filter={filterState.filter}
            changeFilter={handleFilterChange}
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
