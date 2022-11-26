import { router } from '../trpc'
import { authRouter } from './auth'
import { emailRouter } from './emailRouter'
import { registeredUserRouter } from './registeredUserRouter'
import { userRouter } from './userRouter'

export const appRouter = router({
  auth: authRouter,
  registeredUser: registeredUserRouter,
  email: emailRouter,
  user: userRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
