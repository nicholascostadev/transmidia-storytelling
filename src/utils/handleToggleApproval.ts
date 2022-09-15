import { RegisteredUser } from '@prisma/client'
import { Dispatch, SetStateAction } from 'react'

function handleToggleApproval(
  userId: string,
  approvedStatus: boolean,
  setUsersToShow: Dispatch<SetStateAction<RegisteredUser[] | null>>,
  toggleApprovalMutation: any,
  toast: any,
) {
  return () => {
    setUsersToShow((users) =>
      users?.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            approved: !user.approved,
          }
        }

        return user
      }),
    )

    toggleApprovalMutation.mutate(
      { id: userId, approved: approvedStatus },
      {
        onError: () => {
          toast({
            title: 'Erro.',
            description: 'Erro ao alterar status de aprovação',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          })
          setUsersToShow((users) =>
            users?.map((user) => {
              if (user.id === userId) {
                return {
                  ...user,
                  approved: approvedStatus,
                }
              }

              return user
            }),
          )
        },
        onSuccess: () => {
          toast({
            title: 'Alterado',
            description: `Usuário alterado para ${formatApproval(
              !approvedStatus,
            )}`,
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          })
        },
      },
    )
  }
}
