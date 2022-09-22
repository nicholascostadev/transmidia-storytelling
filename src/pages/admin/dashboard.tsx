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

import { RegisteredUser } from '@prisma/client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { ArrowCounterClockwise, CaretLeft, CaretRight } from 'phosphor-react'

import { useEffect, useState } from 'react'

import { DashboardHeader } from '../../components/pages/Dashboard/DashboardHeader'

import { DashboardTable } from '../../components/pages/Dashboard/DashboardTable'

import { NotAllowed } from '../../components/NotAllowed'
import { Search } from '../../components/Search'
import { TFilter } from '../../types/queryFilter'
import { stringOrNull } from '../../utils/stringOrNull'

import { trpc } from '../../utils/trpc'

export default function Dashboard() {
  const { data, status } = useSession()

  const [page, setPage] = useState(1)

  const [itemsPerPage, setItemsPerPage] = useState(5)

  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<TFilter>('email')

  const router = useRouter()

  const q = stringOrNull(router.query.q)?.trim()

  const userInfo = trpc.useQuery(
    ['user.getUserInfo', { id: String(data?.user?.id) }],
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    },
  )

  const [lastAvailablePage, setLastAvailablePage] = useState(1)

  const infiniteUsers = trpc.useInfiniteQuery(
    ['dashboard.infiniteUsers', { limit: itemsPerPage, query: q, filter }],

    {
      refetchOnWindowFocus: false,

      onSuccess: (lastPage) => {
        if (page === 1) {
          setUsersToShow(lastPage.pages[0]?.items as RegisteredUser[])
        }
      },

      getNextPageParam: (lastPage) => lastPage.nextCursor,

      keepPreviousData: true,
    },
  )
  useEffect(() => {
    if (page > 0) {
      setUsersToShow(
        infiniteUsers.data?.pages[page - 1]?.items as RegisteredUser[],
      )
    }
  }, [infiniteUsers.data?.pages, page])

  // debounce effect when searching
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      router.push(
        {
          query: {
            ...router.query,
            q: query,
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
  }, [query, router])

  const [usersToShow, setUsersToShow] = useState<RegisteredUser[]>(
    infiniteUsers.data?.pages[0]?.items as RegisteredUser[],
  )

  const toggleApprovalMutation = trpc.useMutation([
    'dashboard.toggleUserApproval',
  ])

  const borderColor = useColorModeValue('gray.100', 'gray.700')

  function handleQueryChange(newQuery: string) {
    setQuery(newQuery)
  }

  function handleFilterChange(filter: TFilter) {
    setFilter(filter)
  }

  const hasMorePages = infiniteUsers.hasNextPage || lastAvailablePage > page

  function handleGotoNextPage() {
    infiniteUsers.fetchNextPage()

    if (hasMorePages) {
      setPage((page) => page + 1)

      setLastAvailablePage(page + 1)
    }
  }

  function handleGotoPrevPage() {
    setPage((page) => {
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
      <Center minH="calc(100vh - 72px)" display="flex" flexDirection="column">
        <Stack w="1200px" maxW="100%" mx="auto">
          <Search
            currentQuery={query}
            changeQuery={handleQueryChange}
            filter={filter}
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
            />
          </Box>

          <Flex justify="space-between" w="1200px" maxW="100%">
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
              onClick={() => infiniteUsers.refetch()}
              isLoading={infiniteUsers.isRefetching || infiniteUsers.isLoading}
            />

            <ButtonGroup size="sm">
              <IconButton
                as={CaretLeft}
                disabled={page === 1}
                cursor="pointer"
                onClick={handleGotoPrevPage}
                aria-label="Previous page icon"
              />

              <IconButton
                as={CaretRight}
                disabled={!hasMorePages}
                cursor="pointer"
                onClick={handleGotoNextPage}
                aria-label="Next page icon"
              />
            </ButtonGroup>
          </Flex>
        </Stack>
      </Center>
    </>
  )
}
