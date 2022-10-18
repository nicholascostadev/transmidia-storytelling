import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Checkbox,
  Divider,
  Fade,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Link as ChakraLink,
  Select,
  Stack,
  Text,
  useColorModeValue,
  // useToast,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import Link from 'next/link'
// import { useRouter } from 'next/router'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Input } from '../Input'
import statesCities from '../../utils/city-states.json'
import { trpc } from '../../utils/trpc'
import {
  firstStepInputs,
  genderOptions,
  secondStepInputs,
} from './formStepInputs'
import { validation } from '../../../@types/formValidation'
type FormData = z.infer<typeof validation>

export interface Estado {
  sigla: string
  nome: string
  cidades: string[]
}

export interface StatesAndCities {
  estados: Estado[]
}

const TOTAL_STEPS = 2

const parsedStates = JSON.parse(JSON.stringify(statesCities))
  .estados as StatesAndCities['estados']

export const ParticipateForm = () => {
  const registerMutation = trpc.useMutation([
    'openRegisteredUser.register',
  ]) as any
  // const { mutate: sendConfirmationEmail } = trpc.useMutation([
  //   'emailRouter.sendMail',
  // ])
  const [formStep, setFormStep] = useState(1)
  const isLastStep = formStep === TOTAL_STEPS
  // const router = useRouter()
  // const toast = useToast()
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [possibleCities, setPossibleCities] = useState<string[]>(['Acrelândia'])
  const disabeldBg = useColorModeValue('blackAlpha.300', 'whiteAlpha.200')

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    control,
    // reset,
  } = useForm<FormData>({
    resolver: zodResolver(validation),
    defaultValues: {
      age: 18,
      state: 'AC',
      city: 'Acrelândia',
    },
    mode: 'onBlur',
  })
  const inputBg = useColorModeValue('initial', 'gray.800')

  const notRequiredInputs = ['disabilities', 'previousKnowledge']

  const currentState = watch('state')

  useEffect(() => {
    const result = parsedStates.filter((state) => {
      return state.sigla === currentState
    })
    setPossibleCities(result[0]?.cidades as string[])
  }, [currentState])

  const handleNextStep = () => {
    if (formStep + 1 <= 2) setFormStep((prev) => prev + 1)
  }

  const handlePrevStep = () => {
    if (formStep - 1 >= 1) setFormStep((prev) => prev - 1)
  }

  function handleRegister(data: FormData) {
    return data
    // disabled right now(code is working fine) since it's not supposed
    // to be launched now

    // registerMutation.mutate(data, {
    //   onError: (err: any) => {
    //     toast({
    //       title: 'Erro.',
    //       description:
    //         'Erro ao registrar. Você está se registrando novamente sem querer?',
    //       status: 'error',
    //       duration: 9000,
    //       isClosable: true,
    //       position: 'top-right',
    //     })
    //     console.error({ err })
    //   },
    //   onSuccess: (data: any) => {
    //     toast({
    //       title: 'Registrado.',
    //       description: 'Você foi registrado com sucesso!',
    //       status: 'success',
    //       duration: 9000,
    //       isClosable: true,
    //       position: 'top-right',
    //     })
    //     sendConfirmationEmail({
    //       email: data.email,
    //       userId: data.id,
    //     })
    //     router.push('/thankyou')
    //     reset()
    //   },
    // })
  }

  const formStepContainer = {
    hidden: { x: '200%', transitionDuration: '1s', ease: 'linear' },
    show: {
      x: 0,
    },
  }

  return (
    <Fade in={true} transition={{ enter: { duration: 1.5 } }}>
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
        overflow="hidden"
      >
        <Center display={'flex'} flexDir="column" pb="2" gap="2">
          <Heading>Cadastro</Heading>
          <Divider />
        </Center>
        <Flex position="relative" h={{ base: '460px', md: '420px' }}>
          <Box
            as={motion.div}
            position="absolute"
            w="full"
            variants={formStepContainer}
            initial="hidden"
            animate={formStep === 1 ? 'show' : 'hidden'}
          >
            {firstStepInputs.map(({ title, field, type }) => {
              if (field === 'cpf') {
                return (
                  <Controller
                    key={field}
                    name="cpf"
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <Input
                          mask="999.999.999-99"
                          name="cpf"
                          defaultValue={value}
                          label="CPF"
                          inputMode="numeric"
                          bg={inputBg}
                          error={errors.cpf}
                          isRequired
                          flex="1"
                          onChange={(e) =>
                            onChange(
                              e.target.value
                                .replaceAll('.', '')
                                .replaceAll('-', '')
                                .replaceAll('_', ''),
                            )
                          }
                        />
                      )
                    }}
                  />
                )
              }
              return (
                <Input
                  key={field}
                  label={title}
                  bg={inputBg}
                  error={errors[field]}
                  isRequired
                  flex="1"
                  type={type}
                  inputMode={type === 'number' ? 'numeric' : 'text'}
                  {...register(field, {
                    valueAsNumber: type === 'number',
                  })}
                />
              )
            })}
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
          </Box>
          <Box
            as={motion.div}
            variants={formStepContainer}
            initial="hidden"
            animate={formStep === 2 ? 'show' : 'hidden'}
            position="absolute"
            w="full"
          >
            {secondStepInputs.map(({ title, field, type }) => {
              return (
                <Input
                  label={title}
                  bg={inputBg}
                  error={errors[field]}
                  key={field}
                  isRequired={!notRequiredInputs.find((item) => item === field)}
                  type={type}
                  {...register(field)}
                />
              )
            })}
            <FormLabel>Gênero</FormLabel>
            <Select {...register('gender')} variant="outline">
              {genderOptions.map(({ title, value }) => (
                <option value={value} key={value}>
                  {title}
                </option>
              ))}
            </Select>
            <FormLabel>Qual o seu nível de escolaridade?</FormLabel>
            <Select {...register('academic')} variant="outline">
              <option value="ensino-fundamental">
                Ensino Fundamental Completo
              </option>
              <option value="ensino-medio">Ensino Médio Completo</option>
              <option value="ensino-superior">Ensino Superior Completo</option>
            </Select>
            <FormLabel>Qual a sua ocupação atual?</FormLabel>
            <Select {...register('occupation')}>
              <option value="estudante">Estudante</option>
              <option value="profissional">Profissional</option>
            </Select>
            <Checkbox
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              checked={acceptedTerms}
              defaultChecked={acceptedTerms}
              isRequired
              justifyContent="start"
              alignItems="start"
              py="4"
            >
              <Text fontSize="sm" color="gray.500" lineHeight="1.2">
                Ao continuar, você concorda com os{' '}
                <Link href="/participate/terms" passHref>
                  <ChakraLink color="blue.400">
                    termos de consentimento
                  </ChakraLink>
                </Link>{' '}
                do uso de seus dados para a confecção da pesquisa.
              </Text>
            </Checkbox>
          </Box>
        </Flex>
        {isLastStep && (
          <ButtonGroup display="flex" justifyContent="flex-end">
            <Button
              type="button"
              alignItems="center"
              transition="all 0.3s"
              colorScheme={'gray'}
              size={'lg'}
              // right now it's disabled because we don't have the terms of use
              isLoading={registerMutation.isLoading}
              leftIcon={<CaretLeft />}
              onClick={handlePrevStep}
            >
              Voltar
            </Button>
            <Button
              type="submit"
              alignItems="center"
              transition="all 0.3s"
              colorScheme={'purple'}
              size={'lg'}
              _hover={{ bg: 'purple.500' }}
              bg={'purple.400'}
              // right now it's disabled because we don't have the terms of use
              isDisabled={!acceptedTerms || !isValid || true}
              _disabled={{
                bg: disabeldBg,
                _hover: {
                  bg: disabeldBg,
                },
                cursor: 'not-allowed',
              }}
              alignSelf="end"
              isLoading={registerMutation.isLoading}
            >
              Participar
            </Button>
          </ButtonGroup>
        )}
        {!isLastStep && (
          <ButtonGroup
            display="flex"
            justifyContent="flex-end"
            alignSelf="flex-end"
          >
            <Button
              type="button"
              alignItems="center"
              transition="all 0.3s"
              colorScheme={'purple'}
              size={'lg'}
              _hover={{ bg: 'purple.500' }}
              bg={'purple.400'}
              // right now it's disabled because we don't have the terms of use
              _disabled={{
                bg: disabeldBg,
                _hover: {
                  bg: disabeldBg,
                },
                cursor: 'not-allowed',
              }}
              onClick={handleNextStep}
              isLoading={registerMutation.isLoading}
              rightIcon={<CaretRight />}
              isDisabled={true}
            >
              Próximo
            </Button>
          </ButtonGroup>
        )}
      </Stack>{' '}
    </Fade>
  )
}
