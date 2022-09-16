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
  useColorModeValue,
} from '@chakra-ui/react'
import { RegisteredUser } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useEffect, useState } from 'react'

import { DashboardHeader } from '../../components/Dashboard/DashboardHeader'
import { DashboardTable } from '../../components/Dashboard/DashboardTable'
import { NotAllowed } from '../../components/NotAllowed'
import { trpc } from '../../utils/trpc'

export default function Dashboard() {
  const { data, status } = useSession()
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const userInfo = trpc.useQuery([
    'user.getUserInfo',
    { id: String(data?.user?.id) },
  ])
  const [lastAvailablePage, setLastAvailablePage] = useState(1)

  const infiniteUsers = trpc.useInfiniteQuery(
    ['dashboard.infinteUsers', { limit: itemsPerPage }],
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

  const hasMorePages = infiniteUsers.hasNextPage || lastAvailablePage > page

  useEffect(() => {
    if (page > 0) {
      setUsersToShow(
        infiniteUsers.data?.pages[page - 1]?.items as RegisteredUser[],
      )
    }
    console.log({ currentPage: page })
  }, [infiniteUsers.data?.pages, page])

  const [usersToShow, setUsersToShow] = useState<RegisteredUser[]>(
    infiniteUsers.data?.pages[0]?.items as RegisteredUser[],
  )

  console.log(infiniteUsers.data)

  const toggleApprovalMutation = trpc.useMutation([
    'dashboard.toggleUserApproval',
  ])

  const borderColor = useColorModeValue('gray.100', 'gray.700')

  if (
    (userInfo.data?.permission !== 'admin' && status !== 'loading') ||
    (!data && status !== 'loading')
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
      <DashboardHeader />
      <Center minH="calc(100vh - 72px)" display="flex" flexDirection="column">
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
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
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
                console.log('Has next page: ', infiniteUsers.hasNextPage)
                console.log('Next available page: ', lastAvailablePage)
                if (hasMorePages) {
                  setPage((page) => page + 1)
                  setLastAvailablePage(page + 1)
                }
              }}
              aria-label="Next page icon"
            />
          </ButtonGroup>
        </Flex>
      </Center>
    </>
  )
}

//   <Link href={`/admin/answers/${user.cpf}`}>
//   <ChakraLink>Respostas</ChakraLink>
// </Link>
