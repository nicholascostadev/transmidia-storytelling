import InputMask from 'react-input-mask'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react'
import { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError } from 'react-hook-form'

interface InputProps extends ChakraInputProps {
  name: string
  label?: string
  mask?: string
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error, mask = null, ...rest },
  ref,
) => {
  if (mask) {
    return (
      <FormControl isInvalid={!!error} isRequired={rest.isRequired}>
        {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
        <ChakraInput
          name={name}
          id={name}
          ref={ref}
          as={InputMask}
          mask={mask}
          {...rest}
        />
        {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    )
  }

  return (
    <FormControl isInvalid={!!error} isRequired={rest.isRequired}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput step="any" name={name} id={name} ref={ref} {...rest} />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)
