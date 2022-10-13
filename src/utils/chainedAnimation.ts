/**
 * @param [durationInSeconds=2] - The duration of the animation in seconds.
 * @returns A simple container with staggered animation
 */
export const generateContainer = (durationInSeconds = 2) => {
  return {
    hidden: { opacity: 0, transitionDuration: `${durationInSeconds}s` },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }
}

/**
 * Changes the direction of the animation depending on the param
 * @param {'to-right' | 'to-left'} direction - 'to-right' | 'to-left'
 * @returns What is necessary for framer-motion animation work
 */
export const item = (direction: 'to-right' | 'to-left') => {
  if (direction === 'to-left') {
    return {
      hidden: { opacity: 0, x: '200px', transitionDuration: '2s' },
      show: { opacity: 1, x: 0 },
    }
  }

  return {
    hidden: { opacity: 0, x: '-400px', transitionDuration: '1s' },
    show: { opacity: 1, x: 0 },
  }
}
