// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { exampleRouter } from './example'
import { protectedUserRouter } from './protectedUserRouter'
import { userRouter } from './user'
import { dashboardRouter } from './dashboardRouter'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('example.', exampleRouter)
  .merge('auth.', protectedUserRouter)
  .merge('user.', userRouter)
  .merge('dashboard.', dashboardRouter)

// export type definition of API
export type AppRouter = typeof appRouter
