export const defaultGradient = 'linear(to-r, pink.400, purple.600)'
export const defaultGradientInv = 'linear(to-r, purple.600, pink.600)'

type direction =
  | 'to-t'
  | 'to-tr'
  | 'to-r'
  | 'to-br'
  | 'to-b'
  | 'to-bl'
  | 'to-l'
  | 'to-tl'

// late on, remove `defaultGradient` and `defaultGradientInv`
// and use only this one

/**
 * It takes a direction and an inverted boolean and returns a gradient string
 * @param {direction} [direction=to-r] - The direction of the gradient.
 * @param [inverted=false] - boolean - if true, the gradient will be inverted
 * @returns A string with the gradient
 */
export const gradientWithDir = (
  direction: direction = 'to-r',
  inverted = false,
) => {
  if (inverted) return `linear(${direction}, purple.600, pink.400)`

  return `linear(${direction}, pink.400, purple.600)`
}
