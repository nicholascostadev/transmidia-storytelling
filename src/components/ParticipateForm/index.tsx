import {
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
  useToast,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { FormData, validation } from '../../../@types/formValidation'
import statesCities from '../../utils/city-states.json'
import { trpc } from '../../utils/trpc'
import { Input } from '../Input'
import { firstStepInputs, genderOptions } from './formStepInputs'

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
  // variable that will be removed when we launch the app (there may be a better
  // way of doing so, maybe using a .env variable or something, but right now,
  // it does the work it's supposed to do)
  const isLaunched = true

  const registerMutation = trpc.registeredUser.register.useMutation()
  // const { mutate: sendConfirmationEmail } = trpc.email.sendMail.useMutation()
  const [formStep, setFormStep] = useState(1)
  const router = useRouter()
  const toast = useToast()
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [possibleCities, setPossibleCities] = useState<string[]>(['Acrelândia'])
  const [otherSexValue, setOtherSexValue] = useState('')
  const disabledBg = useColorModeValue('blackAlpha.300', 'whiteAlpha.200')

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(validation),
    defaultValues: {
      age: 18,
      state: 'AC',
      city: 'Acrelândia',
      gender: 'prefer-not-to-classify',
      occupation: 'no-occupation',
    },
    reValidateMode: 'onChange',
    mode: 'all',
  })

  const inputBg = useColorModeValue('initial', 'gray.800')
  const currentState = watch('state')
  const currentSex = watch('sex')

  // TODO: Refactor this, should be using a useMemo, no need for effect here
  // probably
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
    // disabled right now(code is working fine) since it's not supposed
    // to be launched now

    if (!isLaunched) return data

    registerMutation.mutate(
      { ...data },
      {
        onError: () => {
          toast({
            title: 'Erro.',
            description:
              'Erro ao registrar. Você está se registrando novamente sem querer?',
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top-right',
          })
        },
        onSuccess: () => {
          toast({
            title: 'Registrado.',
            description: 'Você foi registrado com sucesso!',
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'top-right',
          })
          // sendConfirmationEmail({
          //   email: data.email,
          //   userId: data.id,
          //   name: data.name,
          // })
          router.push('/thankyou')
          reset()
        },
      },
    )
  }

  const formStepContainer = {
    hidden: { x: '200%', transitionDuration: '1s', ease: 'linear' },
    show: {
      x: 0,
    },
  }

  console.log(errors)

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
        <Flex
          position="relative"
          h={{
            base: formStep === 1 ? '560px' : '620px',
            md: formStep === 1 ? '520px' : '600px',
          }}
        >
          <Stack
            as={motion.div}
            position="absolute"
            w="full"
            variants={formStepContainer}
            initial="hidden"
            animate={formStep === 1 ? 'show' : 'hidden'}
            h="full"
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
                          isDisabled={formStep !== 1}
                          helperText={
                            'Seu CPF não será compartilhado com ninguém, não se preocupe. Ele é necessário para validar que você é uma pessoa real.'
                          }
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
                  isDisabled={formStep !== 1}
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
                      <Select
                        onChange={onChange}
                        value={value}
                        isDisabled={formStep !== 1}
                      >
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
              <FormControl
                isInvalid={!!errors.state}
                isRequired
                isDisabled={formStep !== 1}
              >
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
            <ButtonGroup display="flex" alignSelf="flex-end" mt="auto!">
              <Button
                type="button"
                alignItems="center"
                transition="all 0.3s"
                colorScheme={'purple'}
                size={'lg'}
                _hover={{ bg: 'purple.500' }}
                mt="1rem"
                bg={'purple.400'}
                // right now it's disabled because we don't have the terms of use
                _disabled={{
                  bg: disabledBg,
                  _hover: {
                    bg: disabledBg,
                  },
                  cursor: 'not-allowed',
                }}
                onClick={handleNextStep}
                isLoading={registerMutation.isLoading}
                isDisabled={formStep !== 1}
                rightIcon={<CaretRight />}
              >
                Próximo
              </Button>
            </ButtonGroup>
          </Stack>
          <Stack
            as={motion.div}
            variants={formStepContainer}
            initial="hidden"
            animate={formStep === 2 ? 'show' : 'hidden'}
            position="absolute"
            w="full"
            h="full"
          >
            <FormLabel>Você possui deficiência?</FormLabel>
            <Select
              {...register('hasDisabilities')}
              isDisabled={formStep !== 2}
            >
              <option value="yes">Sim</option>
              <option value="no">Não</option>
            </Select>
            <FormLabel>
              Já consumiu algum conteúdo de ciência antes deste questionário?
            </FormLabel>
            <Select
              {...register('previousExperience')}
              isDisabled={formStep !== 2}
            >
              <option value="yes">Sim</option>
              <option value="no">Não</option>
            </Select>

            <FormLabel>Qual seu sexo?</FormLabel>
            <Select {...register('sex')} isDisabled={formStep !== 2}>
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
              <option value="other">Outro</option>
            </Select>
            {currentSex === 'other' && (
              <Input
                label="Nos diga, por favor"
                bg={inputBg}
                error={errors.sex}
                flex="1"
                type="text"
                inputMode="text"
                isDisabled={formStep !== 2}
                value={otherSexValue}
                variant="outline"
                onChange={(e) => setOtherSexValue(e.target.value)}
                name="otherSex"
              />
            )}
            <FormLabel>Gênero</FormLabel>
            <Select
              {...register('gender')}
              variant="outline"
              isDisabled={formStep !== 2}
            >
              {genderOptions.map(({ title, value }) => (
                <option value={value} key={value}>
                  {title}
                </option>
              ))}
            </Select>

            <FormLabel>Qual o seu nível de escolaridade?</FormLabel>
            <Select
              {...register('occupation')}
              variant="outline"
              isDisabled={formStep !== 2}
            >
              <option value="student">
                Estudante (iniciação científica, graduação, especialização e
                pós-graduação)
              </option>
              <option value="part-time-job">Trabalho tempo parcial</option>
              <option value="full-time-job">Trabalho tempo integral</option>
              <option value="no-occupation">Sem ocupação profissional</option>
            </Select>
            <Checkbox
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              checked={acceptedTerms}
              defaultChecked={acceptedTerms}
              isRequired
              justifyContent="start"
              alignItems="start"
              py="4"
              isDisabled={formStep !== 2}
            >
              <Text fontSize="sm" color="gray.500" lineHeight="1.2">
                Ao continuar, você concorda com os{' '}
                {/* 
                  Removing href for user not being able to press TAB and end up
                  going to the second step and animation break
                */}
                {formStep === 2 ? (
                  <ChakraLink
                    as={Link}
                    href={'/participate/terms'}
                    color="blue.400"
                  >
                    termos de consentimento{' '}
                  </ChakraLink>
                ) : (
                  <ChakraLink color="blue.400">
                    termos de consentimento
                  </ChakraLink>
                )}
                do uso de seus dados para a confecção da pesquisa.
              </Text>
            </Checkbox>

            <ButtonGroup display="flex" justifyContent="flex-end" mt="auto!">
              <Button
                type="button"
                alignItems="center"
                transition="all 0.3s"
                colorScheme={'gray'}
                size={'lg'}
                // right now it's disabled because we don't have the terms of use
                isLoading={registerMutation.isLoading}
                isDisabled={formStep !== 2}
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
                isDisabled={
                  !acceptedTerms || !isValid || formStep !== 2 || !isLaunched
                }
                _disabled={{
                  bg: disabledBg,
                  _hover: {
                    bg: disabledBg,
                  },
                  cursor: 'not-allowed',
                }}
                alignSelf="end"
                isLoading={registerMutation.isLoading}
              >
                Participar
              </Button>
            </ButtonGroup>
          </Stack>
        </Flex>
      </Stack>{' '}
    </Fade>
  )
}
