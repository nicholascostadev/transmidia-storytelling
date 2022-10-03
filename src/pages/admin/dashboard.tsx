import {
  Box,
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
import type { RegisteredUser } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ArrowCounterClockwise, CaretLeft, CaretRight } from 'phosphor-react'
import { useEffect, useReducer, useState } from 'react'

import { NotAllowed } from '../../components/NotAllowed'
import { DashboardHeader } from '../../components/pages/Dashboard/DashboardHeader'
import { DashboardTable } from '../../components/pages/Dashboard/DashboardTable'
import { Search } from '../../components/Search'
import {
  filterReducer,
  initialState,
  QueryAction,
} from '../../reducers/queryReducer'
import { TFilter } from '../../types/queryFilter'
import { stringOrNull } from '../../utils/stringOrNull'
import { trpc } from '../../utils/trpc'

export default function Dashboard() {
  const { data, status } = useSession()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [filterState, dispatch] = useReducer(filterReducer, initialState)

  const [lastAvailablePage, setLastAvailablePage] = useState(1)
  const { query, push: pushToRoute } = useRouter()
  const q = stringOrNull(query.q)?.trim()

  const backgroundColor = useColorModeValue('gray.100', '')

  const userInfo = trpc.useQuery(
    ['openUser.getUserInfo', { id: String(data?.user?.id) }],
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    },
  )

  const infiniteUsers: any = trpc.useInfiniteQuery(
    [
      'protectedRegisteredUser.infiniteUsers',
      { limit: itemsPerPage, query: q, filter: filterState.filter },
    ],

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

  const toggleApprovalMutation = trpc.useMutation([
    'protectedRegisteredUser.toggleUserApproval',
  ])
  const deleteUserMutation = trpc.useMutation([
    'protectedRegisteredUser.deleteUser',
  ])

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

  // debounce effect when searching
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.q === filterState.query) return

      // whenever the query changes, we reset the page to 1
      // and also the lastAvailablePage to 1
      // because we want to show the first page of results
      // IF we don't do so, the list won't be shown(at least if the result has less than 5 items)
      setCurrentPage(1)
      setLastAvailablePage(1)
      pushToRoute(
        {
          query: {
            ...query,
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
  }, [filterState.query, pushToRoute, query, infiniteUsers])

  const [usersToShow, setUsersToShow] = useState<RegisteredUser[]>(
    infiniteUsers.data?.pages[0]?.items as RegisteredUser[],
  )

  const borderColor = useColorModeValue('gray.100', 'gray.700')

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

  if (
    (userInfo.data?.permission !== 'admin' && status === 'authenticated') ||
    status === 'unauthenticated'
  ) {
    return <NotAllowed />
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
      <DashboardHeader hasPermission={userInfo.data?.permission === 'admin'} />
      <Center
        minH="calc(100vh - 72px)"
        display="flex"
        flexDirection="column"
        bg={backgroundColor}
      >
        <Stack w="1200px" maxW="100%" mx="auto">
          <Search
            currentQuery={filterState.query}
            changeQuery={handleQueryChange}
            filter={filterState.filter}
            changeFilter={handleFilterChange}
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
              toggleApprovalMutation={toggleApprovalMutation}
              usersToShow={usersToShow}
              deleteUserMutation={deleteUserMutation}
            />
          </Box>
        </Stack>{' '}
        <Flex justify="space-between" w="1200px" maxW="100%" mt="2">
          <Flex justify="center" alignItems="center">
            <FormLabel>Itens por página</FormLabel>

            <NumberInput
              w="20"
              defaultValue={itemsPerPage}
              min={5}
              max={20}
              value={itemsPerPage}
              onChange={(value, valueAsNumber) =>
                setItemsPerPage(valueAsNumber)
              }
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
            onClick={() =>
              infiniteUsers.refetch({
                // typing not being assured because of inifiniteUsers not being
                // typed properly for some reason
                refetchPage: (page: unknown, index: number) =>
                  index === currentPage - 1,
              })
            }
            isLoading={infiniteUsers.isRefetching || infiniteUsers.isLoading}
          />

          <ButtonGroup size="sm">
            <IconButton
              as={CaretLeft}
              disabled={currentPage === 1}
              cursor="pointer"
              onClick={handleGotoPrevPage}
              aria-label="Previous page icon"
            />

            <IconButton
              as={CaretRight}
              isDisabled={!hasMorePages}
              cursor="pointer"
              onClick={handleGotoNextPage}
              aria-label="Next page icon"
            />
          </ButtonGroup>
        </Flex>
      </Center>
    </>
  )
}
