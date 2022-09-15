import { Button } from '@chakra-ui/react'

type Props = {
  number: number
  isCurrent?: boolean
  onPageChange: (page: number) => void
}

export const PageButton = ({
  isCurrent = false,
  number,
  onPageChange,
}: Props) => {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="pink"
        disabled
        _disabled={{ bg: 'pink.500', cursor: 'default' }}
      >
        {number}
      </Button>
    )
  }
  return (
    <Button
      bg="gray.700"
      size="sm"
      width="4"
      _hover={{ bg: 'gray.500' }}
      fontSize="xs"
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  )
}
