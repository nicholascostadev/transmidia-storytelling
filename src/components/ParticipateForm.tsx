import statesCities from '../utils/city-states.json'
import { validation } from '../../@types/formValidation'
import {
  Button,
  Center,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Link as ChakraLink,
  Select,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '../components/Input'
import { trpc } from '../utils/trpc'
import { useRouter } from 'next/router'

const inputs = ['age', 'disabilities', 'previousKnowledge'] as const

enum INPUTS_ENUM {
  age = 'Idade',
  disabilities = 'Possui alguma Deficiência?',
  previousKnowledge = 'Possui conhecimento prévio na área da ciência?',
}

type FormData = z.infer<typeof validation>

export interface Estado {
  sigla: string
  nome: string
  cidades: string[]
}

export interface StatesAndCities {
  estados: Estado[]
}

const parsedStates = JSON.parse(JSON.stringify(statesCities))
  .estados as StatesAndCities['estados']

export const ParticipateForm = () => {
  const registerMutation = trpc.useMutation(['openRegisteredUser.register'])
  const { mutate: sendConfirmationEmail } = trpc.useMutation([
    'emailRouter.sendMail',
  ])
  const router = useRouter()
  const toast = useToast()
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false)
  const [possibleCities, setPossibleCities] = useState<string[]>(['Acrelândia'])

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(validation),
    defaultValues: {
      age: 18,
      state: 'AC',
      city: 'Acrelândia',
    },
  })

  const inputBg = useColorModeValue('initial', 'gray.800')

  function handleRegister(data: FormData) {
    // disabled right now(code is working fine)
    registerMutation.mutate(data, {
      onError: (err) => {
        toast({
          title: 'Erro.',
          description:
            'Erro ao registrar. Você está se registrando novamente sem querer?',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        })
        console.error({ err })
      },
      onSuccess: (data) => {
        toast({
          title: 'Registrado.',
          description: 'Você foi registrado com sucesso!',
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        })
        sendConfirmationEmail({
          email: data.email,
          userId: data.id,
        })
        router.push('/thankyou')
        reset()
      },
    })
  }

  const notRequiredInputs = ['disabilities', 'previousKnowledge']

  const currentState = watch('state')

  useEffect(() => {
    const result = parsedStates.filter((state) => {
      return state.sigla === currentState
    })
    setPossibleCities(result[0]?.cidades as string[])
  }, [currentState])

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
      <Input
        label="Nome"
        bg={inputBg}
        error={errors.name}
        isRequired
        flex="1"
        {...register('name')}
      />
      <Input
        label="Email"
        bg={inputBg}
        error={errors.email}
        isRequired
        flex="1"
        {...register('email')}
      />
      <Controller
        name="cpf"
        control={control}
        render={({ field: { onChange } }) => {
          return (
            <Input
              mask="999.999.999-99"
              name="cpf"
              label="CPF"
              inputMode="numeric"
              bg={inputBg}
              error={errors.cpf}
              isRequired
              flex="1"
              onChange={onChange}
            />
          )
        }}
      />
      <Flex gap="2">
        <Controller
          name="state"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <FormControl isInvalid={!!errors.state} isRequired>
                <FormLabel>Estado</FormLabel>
                <Select onChange={onChange} value={value}>
                  {parsedStates.map((state) => (
                    <option key={state.sigla} value={state.sigla}>
                      {state.nome}
                    </option>
                  ))}
                </Select>
              </FormControl>
            )
          }}
        />
        <FormControl isInvalid={!!errors.state} isRequired>
          <FormLabel>Cidade</FormLabel>
          <Select {...register('city')}>
            {possibleCities?.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </Select>
        </FormControl>
      </Flex>
      {inputs.map((input) => {
        if (input === 'age') {
          return (
            <Input
              label={INPUTS_ENUM[input]}
              bg={inputBg}
              error={errors[input]}
              key={input}
              isRequired
              type="number"
              inputMode="numeric"
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
      <FormLabel>Gênero</FormLabel>
      <Select {...register('gender')} variant="outline">
        <option value="MASCULINO">Masculino</option>
        <option value="FEMININO">Feminino</option>
        <option value="NAO_BINARIO">Não-binário</option>
        <option value="OUTROS">Outros</option>
        <option value="PREFIRO_NAO_DIZER">Prefiro não responder</option>
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
        <Text fontSize="sm" color="gray.500" lineHeight="1.2">
          Ao continuar, você concorda com os{' '}
          <Link href="/participate/terms" passHref>
            <ChakraLink color="blue.400">termos de consentimento</ChakraLink>
          </Link>{' '}
          do uso de seus dados para a confecção da pesquisa.
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
        // right now it's disabled because we don't have the terms of use
        isDisabled={!hasAcceptedTerms}
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
