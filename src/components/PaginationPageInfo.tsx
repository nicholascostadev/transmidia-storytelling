import {
  Flex,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react'

interface PaginationPageInfoProps {
  itemsPerPage: number
  changeItemsPerPage: (value: number) => void
  resetPage?: () => void
}

export const PaginationPageInfo = ({
  itemsPerPage,
  changeItemsPerPage,
  resetPage,
}: PaginationPageInfoProps) => {
  return (
    <Flex justify="center" alignItems="center">
      <FormLabel>Itens por página</FormLabel>
      <NumberInput
        w="20"
        defaultValue={itemsPerPage}
        min={1}
        max={20}
        value={itemsPerPage}
        onChange={(_, value) => {
          changeItemsPerPage(value)
          if (resetPage) resetPage()
        }}
        size="sm"
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Flex>
  )
}
