import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import { isModOrAdmin, isAdmin as isAdminVerifier } from '../back-utils/isAdmin'

import { type Context } from './context'

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape
  },
})

export const router = t.router

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure

/**
 * Reusable middleware to ensure
 * users are logged in
 */
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  })
})

const isAdminOrMod = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  const user = await ctx.prisma.user.findUnique({
    where: {
      id: ctx.session.user.id,
    },
  })

  if (!isModOrAdmin(user?.permission)) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next({
    ctx: {
      ...ctx,
      // infers that `session` is non-nullable to downstream resolvers
      session: { ...ctx.session, user: ctx.session.user },
    },
  })
})

const isAdmin = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  const user = await ctx.prisma.user.findUnique({
    where: {
      id: ctx.session.user.id,
    },
  })

  if (!isAdminVerifier(user?.permission)) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next({
    ctx: {
      ...ctx,
      // infers that `session` is non-nullable to downstream resolvers
      session: { ...ctx.session, user: ctx.session.user },
    },
  })
})

/**
 * Protected procedure
 **/
export const protectedProcedure = t.procedure.use(isAuthed)

export const adminModRouter = t.procedure.use(isAdminOrMod)

export const adminRouter = t.procedure.use(isAdmin)
