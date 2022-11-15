import trpc from '@trpc/server'
import { isModOrAdmin } from '../back-utils/isAdmin'
import { createRouter } from './context'

export function createModeratorRouter() {
  return createRouter().middleware(async ({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new trpc.TRPCError({ code: 'UNAUTHORIZED' })
    }

    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    })

    if (!isModOrAdmin(user?.permission)) {
      throw new trpc.TRPCError({ code: 'UNAUTHORIZED' })
    }

    return next({
      ctx: {
        ...ctx,
        // infers that `session` is non-nullable to downstream resolvers
        session: { ...ctx.session, user: ctx.session.user },
      },
    })
  })
}
