import { z } from "zod";

const sessionSchema = z.object({
  id: z.number(),
  username: z.string(),
  createdAt: z.date(),
});

const messageSchema = z.object({
  id: z.number().optional(),
  content: z.string(),
  // author: z.enum(["USER", "BOT"]),
  author: z.string(), // GUI: you sure?
  createdAt: z.date().optional().default(new Date()),
});

export type Session = z.infer<typeof sessionSchema>;
export type Message = z.infer<typeof messageSchema>;
export type ChatContext = {
  messages: Message[];
  session: Session | null;
  addMessage: (message: Message) => void;
  startSession: (session: Session) => void;
};
