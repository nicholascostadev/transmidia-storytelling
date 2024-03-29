import {
  Button,
  Divider,
  Fade,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  LightMode,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { validateCPF } from '@root/../@types/formValidation/cpf'
import { Bug, EnvelopeOpen, Gauge, PaperPlaneRight, X } from 'phosphor-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Input } from './Input'

const MESSAGE_MAX_SIZE = 300

const cpfSchema = z.union([
  z.string().length(11, 'CPF deve ter 11 dígitos').refine(validateCPF, {
    message: 'CPF informado não existe',
  }),
  z.literal(''),
  z.literal('___.___.___-__'),
])

const schema = z.object({
  name: z
    .string()
    .min(1, 'Nome deve ter no mínimo 1 caractere')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  email: z
    .string()
    .email('Email inválido')
    .min(3, 'Email inválido')
    .max(100, 'Email inválido'),
  cpf: cpfSchema,
  message: z
    .string()
    .min(3, 'Mensagem deve ter no mínimo 3 caracteres')
    .max(MESSAGE_MAX_SIZE, 'Mensagem pode ter no máximo 300 caracteres'),
  type: z.enum(['bug', 'feature', 'other']),
})

type ContactWidgetFields = z.infer<typeof schema>

export const ContactWidget = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {
    register,
    watch,
    formState: { errors },
    control,
  } = useForm<ContactWidgetFields>({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: {
      type: 'bug',
    },
  })

  const noErrors = Object.keys(errors).length === 0
  const backgroundColor = useColorModeValue('white', 'gray.900')
  const border = useColorModeValue('1px', 'none')
  const borderColor = useColorModeValue('gray.100', 'gray.900')
  const shadow = useColorModeValue('lg', 'none')

  return (
    <>
      {isOpen && (
        <Fade in={isOpen} unmountOnExit={true}>
          <Flex
            as="form"
            onSubmit={noErrors ? undefined : (e) => e.preventDefault()}
            action={
              noErrors
                ? 'https://formsubmit.co/nicholascostadev@gmail.com'
                : undefined
            }
            method={noErrors ? 'POST' : undefined}
            position="fixed"
            right={{
              base: '0',
              sm: '5',
              md: '10',
            }}
            bottom={{
              base: '0',
              sm: '5',
            }}
            w={{
              base: '500px',
              sm: '400px',
            }}
            maxW="full"
            h={['full', 'auto', 'auto', 'auto']}
            bg={backgroundColor}
            border={border}
            borderColor={borderColor}
            shadow={shadow}
            p="5"
            rounded="md"
            zIndex={100000}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <IconButton
              onClick={onClose}
              position="absolute"
              right="5"
              top="5"
              variant="ghost"
              size="sm"
              icon={<X size={20} />}
              aria-label="Fechar formulário de contato"
            />
            <Stack w="full" mt="10">
              <Heading size="lg" textAlign="center">
                Conte conosco
              </Heading>
              <Divider orientation="horizontal" w="full" mb="2!" pt="2" />
              <Input
                label="Nome"
                placeholder="Nome"
                type="text"
                error={errors.name}
                {...register('name')}
                isRequired
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
                      placeholder="CPF"
                      inputMode="numeric"
                      error={errors.cpf}
                      flex="1"
                      onChange={(e) =>
                        onChange(
                          e.target.value
                            .replaceAll('.', '')
                            .replaceAll('-', '')
                            .replaceAll('_', ''),
                        )
                      }
                      helperText="O CPF só será necessário caso o problema seja relacionado ao cadastro na pesquisa. Sem ele, não conseguiremos te ajudar."
                    />
                  )
                }}
              />
              <Input
                label="Email"
                placeholder="Email"
                type="email"
                error={errors.email}
                {...register('email')}
                isRequired
              />
              <FormControl isInvalid={!!errors.message} isRequired>
                <FormLabel htmlFor="message">Mensagem</FormLabel>
                <Textarea
                  placeholder="Mensagem"
                  resize="none"
                  rows={5}
                  id="message"
                  {...register('message')}
                />
                {errors.message?.message && (
                  <FormErrorMessage>{errors.message.message}</FormErrorMessage>
                )}
                <Text textAlign="right" fontSize="sm" color="gray.400">
                  {watch('message')?.length ?? 0} / {MESSAGE_MAX_SIZE}
                </Text>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Motivo de contato</FormLabel>
                <RadioGroup pb="5">
                  <HStack>
                    <Radio value="bug" {...register('type')}>
                      <Flex
                        as={Text}
                        justify="center"
                        alignItems="center"
                        gap="1"
                      >
                        <Bug color="green" /> Bug
                      </Flex>
                    </Radio>
                    <Radio value="feature" {...register('type')}>
                      <Flex
                        as={Text}
                        justify="center"
                        alignItems="center"
                        gap="1"
                      >
                        <Gauge color="orange" /> Melhora
                      </Flex>
                    </Radio>
                    <Radio value="other" {...register('type')}>
                      Outro
                    </Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
              <LightMode>
                <Button
                  colorScheme="purple"
                  rightIcon={<PaperPlaneRight />}
                  type="submit"
                >
                  Enviar
                </Button>
              </LightMode>
            </Stack>
          </Flex>
        </Fade>
      )}
      {!isOpen && (
        <Fade in={!isOpen}>
          <LightMode>
            <IconButton
              border="1px"
              borderColor="purple.800"
              position="fixed"
              bottom="5"
              right="10"
              rounded="full"
              h="10"
              w="10"
              colorScheme="purple"
              cursor="pointer"
              aria-label="Abrir formulário de contato"
              onClick={onOpen}
              zIndex={100000}
            >
              <EnvelopeOpen size={20} />
            </IconButton>
          </LightMode>
        </Fade>
      )}
    </>
  )
}
