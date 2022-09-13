// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { exampleRouter } from './example'
import { protectedExampleRouter } from './protected-example-router'
import { userRouter } from './user'
import { dashboardRouter } from './dashboardRouter'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('example.', exampleRouter)
  .merge('auth.', protectedExampleRouter)
  .merge('user.', userRouter)
  .merge('dashboard.', dashboardRouter)

// export type definition of API
export type AppRouter = typeof appRouter
