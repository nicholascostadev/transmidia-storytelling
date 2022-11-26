import { router } from '../trpc'
import { authRouter } from './auth'
import { registeredUserRouter } from './registeredUserRouter'

export const appRouter = router({
  auth: authRouter,
  registeredUser: registeredUserRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
