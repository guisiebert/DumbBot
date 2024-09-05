import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const messageRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        content: z.string().min(1),
        sessionId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { content, sessionId } = input;

      const userMessage = await ctx.db.message.create({
        data: {
          author: "USER",
          content,
          sessionId,
        },
      });

      const botResponses = [
        "I'll plead the 5th and remain silent.",
        "My lawyer doesn't allow me to answer this.",
        "That's a very deep one. Have you tried googling it?",
        "I really don't know.",
        "Hire Guilherme and I'm sure he will help you with this one.",
      ];

      const randomIndex = Math.floor(Math.random() * botResponses.length);

      const botMessage = await ctx.db.message.create({
        data: {
          author: "BOT",
          content: botResponses[randomIndex] as string,
          sessionId,
        },
      });

      return userMessage;
    }),

  getMessagesBySessionId: publicProcedure
    .input(
      z.object({
        sessionId: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { sessionId } = input;

      return (await ctx.db.message.findMany({
        where: {
          sessionId,
        },
      })) as {
        id: number;
        content: string;
        author: "USER" | "BOT";
        createdAt: Date;
        sessionId: number;
      }[];
    }),
});
