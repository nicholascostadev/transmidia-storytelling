import { Box, Stack, Text } from '@chakra-ui/react'

import { PageButton } from './PageButton'

type Props = {
  totalCount: number
  maxSelected?: number
  currentPage?: number
  onPageChange: (page: number) => void
}

const siblingsCount = 1

const generatePagesArray = ({ from, to }: { from: number; to: number }) => {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter((page) => page > 0)
}

export const Pagination = ({
  totalCount,
  currentPage = 1,
  maxSelected = 10,
  onPageChange,
}: Props) => {
  const lastPage = Math.floor(totalCount / maxSelected)
  const previousPages =
    currentPage > 1
      ? generatePagesArray({
          from: currentPage - 1 - siblingsCount,
          to: currentPage - 1,
        })
      : []

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray({
          from: currentPage,
          to: Math.min(currentPage + siblingsCount, lastPage),
        })
      : []
  return (
    <Stack
      direction={['column', 'row']}
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack direction="row" spacing="2">
        {currentPage > 1 + siblingsCount && (
          <>
            <PageButton onPageChange={onPageChange} number={1} />
            {currentPage > 2 + siblingsCount && (
              <Text color="gray.300" width="8" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}
        {previousPages.length > 0 &&
          previousPages.map((prev) => (
            <PageButton onPageChange={onPageChange} number={prev} key={prev} />
          ))}
        <PageButton
          onPageChange={onPageChange}
          number={currentPage}
          isCurrent
        />
        {nextPages.length > 0 &&
          nextPages.map((next) => (
            <PageButton onPageChange={onPageChange} number={next} key={next} />
          ))}
        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <Text color="gray.300" width="8" textAlign="center">
                ...
              </Text>
            )}
            <PageButton onPageChange={onPageChange} number={lastPage} />
          </>
        )}
      </Stack>
    </Stack>
  )
}
