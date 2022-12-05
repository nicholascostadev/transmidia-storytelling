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
import { useRouter } from 'next/router'
import { MagnifyingGlass } from 'phosphor-react'

import type { TFilter } from '../../@types/queryFilter'

interface SearchProps {
  currentQuery: string
  changeQuery: (query: string) => void
  filter: TFilter
  changeFilter: (filter: TFilter) => void
}

export const Search = ({
  currentQuery,
  changeQuery,
  filter,
  changeFilter,
}: SearchProps) => {
  const borderColor = useColorModeValue('gray.100', 'gray.700')
  const backgroundColor = useColorModeValue('white', 'gray.900')
  const shadow = useColorModeValue('sm', 'none')
  const router = useRouter()

  const isOnManageRoute = router.asPath.includes('/manageusers')

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
            filter.field === 'email' ? 'email' : 'nome'
          } de um usuário`}
          value={currentQuery}
          onChange={(e) => changeQuery(e.target.value)}
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
              onChange={(value: TFilter['field']) => {
                changeFilter({ ...filter, field: value })
              }}
              defaultValue="email"
              value={filter.field}
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
                  onChange={(value: string) => {
                    if (value !== 'none') {
                      changeFilter({
                        ...filter,
                        approval: value === 'approved',
                      })
                    } else {
                      changeFilter({
                        ...filter,
                        approval: undefined,
                      })
                    }
                  }}
                  value={
                    filter.approval
                      ? 'approved'
                      : typeof filter.approval === 'undefined'
                      ? 'none'
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
