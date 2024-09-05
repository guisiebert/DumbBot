import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const sessionRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ username: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const { username } = input;

      return await ctx.db.session.create({
        data: {
          username,
        },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.session.findMany({
      include: {
        Message: {
          orderBy: {
            createdAt: "desc",
          },
          skip: 1,
          take: 1,
        },
      },
    });
  }),

  getSessionAndMessagesBySessionId: publicProcedure
    .input(
      z.object({
        sessionId: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { sessionId } = input;

      return await ctx.db.session.findFirst({
        where: {
          id: sessionId,
        },
        include: {
          Message: true,
        },
      });
    }),
});
