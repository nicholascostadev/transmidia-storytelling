// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { exampleRouter } from './example'
import { protectedUserRouter } from './protectedUserRouter'
import { openRegisteredUserRouter } from './openRegisteredUserRouter'
import { protectedRegisteredUserRouter } from './protectedRegisteredUserRouter'
import { openUserRouter } from './openUserRouter'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('example.', exampleRouter)
  .merge('openRegisteredUser.', openRegisteredUserRouter)
  .merge('protectedRegisteredUser.', protectedRegisteredUserRouter)
  .merge('openUser.', openUserRouter)
  .merge('protectedUser.', protectedUserRouter)

// export type definition of API
export type AppRouter = typeof appRouter
