import InputMask from 'react-input-mask'
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
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
  helperText?: string
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error, mask = null, helperText, ...rest },
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
        {helperText && (
          <FormHelperText fontSize="xs">{helperText}</FormHelperText>
        )}
        {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    )
  }

  return (
    <FormControl isInvalid={!!error} isRequired={rest.isRequired}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput step="any" name={name} id={name} ref={ref} {...rest} />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)
