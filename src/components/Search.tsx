import {
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { MagnifyingGlass } from 'phosphor-react'

import { TFilter } from '../types/queryFilter'

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
  const backgroundColor = useColorModeValue('white', '')

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
            filter === 'email' ? 'email' : 'nome'
          } de um usuário`}
          value={currentQuery}
          onChange={(e) => changeQuery(e.target.value)}
        />
        <InputLeftElement>
          <MagnifyingGlass />
        </InputLeftElement>
      </InputGroup>
      <HStack
        border="1px"
        borderColor={borderColor}
        bg={backgroundColor}
        rounded="md"
        p="2"
        w={['full', 'auto']}
      >
        <Text>Filtro:</Text>
        <RadioGroup
          display="flex"
          flexDir="row"
          gap="2"
          onChange={changeFilter}
          value={filter}
        >
          <Radio value="email">Email</Radio>
          <Radio value="name">Nome</Radio>
        </RadioGroup>
      </HStack>
    </Flex>
  )
}
