/* eslint-disable no-unused-vars */
// Enum is not being able detect it's being used, so I'm manually
// removing unused vars warning
import {
  Button,
  Center,
  Checkbox,
  Divider,
  FormLabel,
  Heading,
  Select,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '../components/Input'
import { trpc } from '../utils/trpc'

const inputs = [
  'name',
  'email',
  'cpf',
  'cep',
  'age',
  'disabilities',
  'previousKnowledge',
] as const

enum INPUTS_ENUM {
  name = 'Nome',
  email = 'Email',
  cpf = 'CPF',
  cep = 'CEP',
  age = 'Idade',
  disabilities = 'Possui alguma Deficiência?',
  previousKnowledge = 'Possui conhecimento prévio na área da ciência?',
}

const schema = z.object({
  name: z.string().min(1, 'Nome é Obrigatório'),
  email: z.string().min(1, 'Email é Obrigatório').email(),
  cpf: z
    .string()
    .min(11, 'CPF deve que ter 11 dígitos')
    .max(11, 'CPF deve ter 11 dígitos'),
  cep: z.string().length(8, 'CEP deve ter 8 dígitos').trim(),
  age: z
    .number()
    .min(18, 'A idade mínima para participar da pesquisa é de 18 anos'),
  disabilities: z.string().optional(),
  previousKnowledge: z.string().optional(),
  sex: z.enum(['M', 'F']),
  academic: z.enum(['ensino-fundamental', 'ensino-medio', 'ensino-superior']),
  occupation: z.enum(['estudante', 'profissional']),
})

type FormData = z.infer<typeof schema>

export const ParticipateForm = () => {
  const registerMutation = trpc.useMutation(['user.register'])
  const toast = useToast()
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      age: 18,
    },
  })
  const cpfFormatted = useWatch({
    control,
    name: 'cpf',
  })

  function formatCPF(currentCPF: string) {
    return currentCPF?.replaceAll(/[^0-9]/g, '')
  }

  const output = formatCPF(cpfFormatted)
  useEffect(() => {
    setValue('cpf', output)
  }, [cpfFormatted, output, setValue])

  const inputBg = useColorModeValue('initial', 'gray.800')

  function handleRegister(data: FormData) {
    // save to the list of registered users
    registerMutation.mutate(data, {
      onError: (err: any) => {
        toast({
          title: 'Erro.',
          description:
            'Erro ao registrar. Você está se registrando novamente sem querer?',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        })
        console.log({ err })
      },
      onSuccess: () => {
        toast({
          title: 'Registrado.',
          description:
            'Você entrou na lista de espera e será avaliado para a pesquisa, agora é só esperar que retornaremos assim que possível',
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        })
      },
    })
  }

  const notRequiredInputs = ['disabilities', 'previousKnowledge']

  return (
    <Stack
      w="100%"
      as={'form'}
      onSubmit={handleSubmit(handleRegister)}
      boxShadow={'lg'}
      border="1px"
      borderColor="blackAlpha.200"
      bg={useColorModeValue('white', 'gray.900')}
      p={'3rem'}
      rounded={'lg'}
      zIndex={1000}
    >
      <Center display={'flex'} flexDir="column" pb="2" gap="2">
        <Heading>Cadastro</Heading>
        <Divider />
      </Center>
      {inputs.map((input) => {
        if (input === 'age') {
          return (
            <Input
              label={INPUTS_ENUM[input]}
              bg={inputBg}
              error={errors[input]}
              key={input}
              isRequired
              {...register(input, {
                valueAsNumber: true,
              })}
            />
          )
        }
        return (
          <Input
            label={INPUTS_ENUM[input]}
            bg={inputBg}
            error={errors[input]}
            key={input}
            isRequired={!notRequiredInputs.find((item) => item === input)}
            {...register(input)}
          />
        )
      })}
      <FormLabel>Sexo</FormLabel>
      <Select {...register('sex')} variant="outline">
        <option value="M">Masculino</option>
        <option value="F">Feminino</option>
      </Select>
      <FormLabel>Qual o seu nível de escolaridade?</FormLabel>
      <Select {...register('academic')} variant="outline">
        <option value="ensino-fundamental">Ensino Fundamental Completo</option>
        <option value="ensino-medio">Ensino Médio Completo</option>
        <option value="ensino-superior">Ensino Superior Completo</option>
      </Select>
      <FormLabel>Qual a sua ocupação atual?</FormLabel>
      <Select {...register('occupation')}>
        <option value="estudante">Estudante</option>
        <option value="profissional">Profissional</option>
      </Select>
      <Checkbox
        onChange={() => setHasAcceptedTerms((prev) => !prev)}
        isRequired
        justifyContent="start"
        alignItems="start"
        py="4"
      >
        <Text fontSize="sm" color="gray.400" lineHeight="1.2">
          Ao continuar, você concorda com os termos de consentimento do uso de
          seus dados
        </Text>
      </Checkbox>
      <Button
        type="submit"
        alignItems="center"
        transition="all 0.3s"
        colorScheme={'purple'}
        size={'lg'}
        _hover={{ bg: 'purple.500' }}
        bg={'purple.400'}
        isDisabled={!hasAcceptedTerms && !isValid}
        _disabled={{
          bg: useColorModeValue('blackAlpha.300', 'whiteAlpha.200'),
          _hover: {
            bg: useColorModeValue('blackAlpha.300', 'whiteAlpha.200'),
          },
          cursor: 'not-allowed',
        }}
        isLoading={registerMutation.isLoading}
      >
        Participar
      </Button>
    </Stack>
  )
}
