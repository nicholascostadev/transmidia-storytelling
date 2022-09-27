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

type gradientOpts = 0 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

/**
 * It returns a gradient string based on the direction, whether it's inverted, and
 * you can use whatever level of gradient color you want between 0-900
 * @param {direction} [direction=to-r] - direction = 'to-r'
 * @param {gradientOpts} [pinkGradientLevel=400] - gradientOpts `defaults to: 400`,
 * @param {gradientOpts} [purpleGradientLevel=600] - gradientOpts `defaults to: 600`,
 * @param {boolean} [inverted=false] - `boolean` - if true, the gradient will be inverted
 * @returns A string
 */
export const bgGradientWithDir = (
  direction: direction = 'to-r',
  pinkGradientLevel: gradientOpts = 400,
  purpleGradientLevel: gradientOpts = 600,
  inverted = false,
) => {
  if (inverted)
    return `linear(${direction}, purple.${purpleGradientLevel}, pink.${pinkGradientLevel})`

  return `linear(${direction}, pink.${pinkGradientLevel}, purple.${purpleGradientLevel})`
}

/**
 * It returns a gradient string based on the direction, whether it's inverted, and
 * you can use whatever level of gradient color you want between 0-900
 * @param {direction} [direction=to-r] - direction = 'to-r'
 * @param {gradientOpts} [pinkGradientLevel=400] - gradientOpts `defaults to: 400`,
 * @param {gradientOpts} [purpleGradientLevel=600] - gradientOpts `defaults to: 600`,
 * @param {boolean} [inverted=false] - `boolean` - if true, the gradient will be inverted
 * @returns A string
 */
export const textGradientWithDir = (
  direction: direction = 'to-r',
  pinkGradientLevel: gradientOpts = 600,
  purpleGradientLevel: gradientOpts = 600,
  inverted = false,
) => {
  if (inverted)
    return `linear(${direction}, purple.${purpleGradientLevel}, pink.${pinkGradientLevel})`

  return `linear(${direction}, pink.${pinkGradientLevel}, purple.${purpleGradientLevel})`
}
