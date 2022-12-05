import {
  Divider,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { TFilter } from '@root/../@types/queryFilter'
import { useRouter } from 'next/router'
import { MagnifyingGlass } from 'phosphor-react'
import { DebouncedState } from 'use-debounce'

interface SearchProps {
  handleChangeQuery: DebouncedState<(value: string) => void>
  handleFilterChange: (
    filter: TFilter['field'],
    approval: 'none' | 'approved' | 'unapproved',
  ) => void
  filterField: TFilter['field']
  filterApproval?: boolean
}

export const Search = ({
  handleChangeQuery,
  handleFilterChange,
  filterField,
  filterApproval,
}: SearchProps) => {
  const borderColor = useColorModeValue('gray.100', 'gray.700')
  const backgroundColor = useColorModeValue('white', 'gray.900')
  const shadow = useColorModeValue('sm', 'none')
  const router = useRouter()

  const isOnManageRoute = router.asPath.includes('/manageusers')

  const approvalString =
    filterApproval === undefined
      ? 'none'
      : filterApproval
      ? 'approved'
      : 'unapproved'

  return (
    <Flex
      w="1200px"
      maxW="100%"
      flexDir={['column', 'row']}
      justify="space-between"
      alignItems="end"
      gap="8"
    >
      <InputGroup variant="flushed">
        <Input
          placeholder={`Procure pelo ${
            filterField === 'email' ? 'email' : 'nome'
          } de um usuário`}
          onChange={(e) => handleChangeQuery(e.target.value)}
        />
        <InputLeftElement>
          <MagnifyingGlass />
        </InputLeftElement>
      </InputGroup>
      <Stack
        border="1px"
        borderColor={borderColor}
        bg={backgroundColor}
        rounded="md"
        p="5"
        w={['full', 'max-content']}
        minW="fit-content"
        justifyContent={isOnManageRoute ? 'center' : 'start'}
        alignItems={isOnManageRoute ? 'center' : 'start'}
        spacing="2"
        direction={isOnManageRoute ? 'row' : 'column'}
        shadow={shadow}
      >
        <Text textAlign="center" w="full" minW="fit-content">
          Filtrar por:
        </Text>
        {!isOnManageRoute && (
          <Divider
            w="full"
            h={isOnManageRoute ? '20px' : 'auto'}
            orientation={isOnManageRoute ? 'vertical' : 'horizontal'}
          />
        )}
        <HStack justifyContent="start" alignItems="start" spacing="5">
          <Stack
            direction={isOnManageRoute ? 'row' : 'column'}
            justifyContent={isOnManageRoute ? 'center' : 'start'}
            alignItems={isOnManageRoute ? 'center' : 'start'}
          >
            {!isOnManageRoute && (
              <>
                <Text>Campos</Text>
                <Divider orientation="horizontal" />
              </>
            )}
            <RadioGroup
              display="flex"
              flexDir={isOnManageRoute ? 'row' : 'column'}
              gap="2"
              onChange={(field: TFilter['field']) =>
                handleFilterChange(field, approvalString)
              }
              defaultValue="email"
              value={filterField}
            >
              <Radio value="email">Email</Radio>
              <Radio value="name">Nome</Radio>
            </RadioGroup>
          </Stack>
          {!isOnManageRoute && (
            <>
              <Divider h="150px" orientation="vertical" />
              <Stack>
                <Text>Aprovação</Text>
                <Divider orientation="horizontal" />
                <RadioGroup
                  display="flex"
                  flexDir="column"
                  gap="2"
                  defaultValue="none"
                  onChange={(value: 'none' | 'approved' | 'unapproved') => {
                    handleFilterChange(filterField, value)
                  }}
                  value={
                    typeof filterApproval === 'undefined'
                      ? 'none'
                      : filterApproval
                      ? 'approved'
                      : 'unapproved'
                  }
                >
                  <Radio value="approved">Aprovado</Radio>
                  <Radio value="unapproved">Não aprovado</Radio>
                  <Radio value="none">Nenhum</Radio>
                </RadioGroup>
              </Stack>
            </>
          )}
        </HStack>
      </Stack>
    </Flex>
  )
}
