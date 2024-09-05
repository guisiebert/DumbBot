import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { sessionRouter } from "./routers/session";
import { messageRouter } from "./routers/messages";

export const appRouter = createTRPCRouter({
  session: sessionRouter,
  message: messageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
