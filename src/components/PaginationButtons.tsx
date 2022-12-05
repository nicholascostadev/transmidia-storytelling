import { ButtonGroup, IconButton } from '@chakra-ui/react'
import { CaretLeft, CaretRight } from 'phosphor-react'

interface PaginationButtonProps {
  currentPage: number
  handleGotoPrevPage: () => void
  handleGotoNextPage: () => void
  hasMorePages: boolean
}

export const PaginationButtons = ({
  currentPage,
  handleGotoPrevPage,
  hasMorePages,
  handleGotoNextPage,
}: PaginationButtonProps) => {
  return (
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
  )
}
