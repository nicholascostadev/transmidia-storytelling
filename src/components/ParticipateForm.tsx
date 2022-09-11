/* eslint-disable no-unused-vars */
// Enum is not being able detect it's being used, so I'm manually
// removing unused vars warning
import {
  Center,
  Divider,
  FormLabel,
  Heading,
  Select,
  Button,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '../components/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'

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
  previousKnowledge: z
    .string()
    .min(
      1,
      'É necessário informar se possui algum conhecimento prévio na área da ciência',
    ),
  gender: z.enum(['M', 'F']),
  academic: z.enum(['ensino-fundamental', 'ensino-medio', 'ensino-superior']),
  occupation: z.enum(['estudante', 'profissional']),
})

type FormData = z.infer<typeof schema>

export const ParticipateForm = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
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
    console.log('Received', data)
    // save to the list of registered users
  }

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
            {...register(input)}
          />
        )
      })}
      <FormLabel>Sexo</FormLabel>
      <Select {...register('gender')} variant="outline">
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
      <Button
        display={{
          base: 'none',
          md: 'flex',
        }}
        alignItems="center"
        transition="all 0.3s"
        colorScheme={'purple'}
        size={'lg'}
        _hover={{ bg: 'purple.500' }}
        bg={'purple.400'}
        type="submit"
        isDisabled
        _disabled={{
          bg: useColorModeValue('blackAlpha.300', 'whiteAlpha.200'),
          _hover: {
            bg: useColorModeValue('blackAlpha.300', 'whiteAlpha.200'),
          },
          cursor: 'not-allowed',
        }}
      >
        Ainda não pronto para envio
        {/* Participar */}
      </Button>
    </Stack>
  )
}
