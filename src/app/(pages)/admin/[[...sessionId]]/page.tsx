import { api } from "@/trpc/server";
import {
  ArrowLeftIcon,
  BotIcon,
  HistoryIcon,
  MessageSquareDashedIcon,
  SearchIcon,
  SkipBackIcon,
  UserIcon,
} from "lucide-react";
import { ChatScreen } from "./chat-screen";
import Link from "next/link";

const fakeChat = [
  {
    content: "hello",
    author: "USER" as "USER" | "BOT",
    createdAt: new Date(),
    id: 1,
  },
  {
    content: "hello",
    author: "BOT" as "USER" | "BOT",
    createdAt: new Date(),
    id: 2,
  },
  {
    content: "hello",
    author: "USER" as "USER" | "BOT",
    createdAt: new Date(),
    id: 3,
  },
  {
    content: "hello",
    author: "USER" as "USER" | "BOT",
    createdAt: new Date(),
    id: 1,
  },
  {
    content: "hello",
    author: "BOT" as "USER" | "BOT",
    createdAt: new Date(),
    id: 2,
  },
  {
    content: "hello",
    author: "USER" as "USER" | "BOT",
    createdAt: new Date(),
    id: 3,
  },
  {
    content: "hello",
    author: "USER" as "USER" | "BOT",
    createdAt: new Date(),
    id: 1,
  },
  {
    content: "hello",
    author: "BOT" as "USER" | "BOT",
    createdAt: new Date(),
    id: 2,
  },
  {
    content: "hello",
    author: "USER" as "USER" | "BOT",
    createdAt: new Date(),
    id: 3,
  },
  {
    content: "hello",
    author: "USER" as "USER" | "BOT",
    createdAt: new Date(),
    id: 1,
  },
  {
    content: "hello",
    author: "BOT" as "USER" | "BOT",
    createdAt: new Date(),
    id: 2,
  },
  {
    content: "hello",
    author: "USER" as "USER" | "BOT",
    createdAt: new Date(),
    id: 3,
  },
  {
    content: "hello",
    author: "USER" as "USER" | "BOT",
    createdAt: new Date(),
    id: 1,
  },
  {
    content: "hello",
    author: "BOT" as "USER" | "BOT",
    createdAt: new Date(),
    id: 2,
  },
  {
    content: "hello",
    author: "USER" as "USER" | "BOT",
    createdAt: new Date(),
    id: 3,
  },
  {
    content: "hello",
    author: "USER" as "USER" | "BOT",
    createdAt: new Date(),
    id: 1,
  },
  {
    content: "hello",
    author: "BOT" as "USER" | "BOT",
    createdAt: new Date(),
    id: 2,
  },
  {
    content: "hello",
    author: "USER" as "USER" | "BOT",
    createdAt: new Date(),
    id: 3,
  },
];

export default async function Admin({
  params,
}: {
  params: { sessionId?: string[] };
}) {
  const data = await api.session.getAll();
  const sessionId = params.sessionId?.[0];

  let session = null;
  if (sessionId) {
    session = await api.session.getSessionAndMessagesBySessionId({
      sessionId: Number(sessionId),
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="flex h-[36rem] w-[55rem] gap-8 rounded-lg bg-card p-6">
        {/* NAV */}
        <Link
          href={"/"}
          className="mb-auto flex justify-center rounded-lg bg-secondary p-2 text-primary"
        >
          <ArrowLeftIcon strokeWidth={2} />
        </Link>

        {/* LIST OF ALL CHATS */}
        <div className="h-full min-w-64 max-w-64 overflow-y-scroll">
          <header className="flex items-center gap-2">
            <HistoryIcon
              size={24}
              className="size-10 rounded bg-muted/50 p-2 text-white"
            />
            <h2 className="text-2xl font-semibold">All Chats</h2>
          </header>

          {data?.map((session) => (
            <Link
              key={session.id}
              href={`/admin/${session.id}`}
              className="my-2 flex gap-4 rounded-lg border bg-white p-4"
            >
              <div className="w-1 rounded bg-muted" />
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <p>{session.username}</p>
                  <small className="text-xs">
                    {session.createdAt.toDateString().slice(4, 10)}
                  </small>
                </div>
                <small className="line-clamp-3 tracking-tight text-muted">
                  {session.Message[0]?.content}
                </small>
              </div>
            </Link>
          ))}
        </div>

        {/* CHAT HISTORY */}
        {!session && (
          <div className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-dashed border-muted text-muted">
            <MessageSquareDashedIcon strokeWidth={2} size={50} /> Select a Chat
          </div>
        )}
        {session && (
          <div className="h-full">
            <ChatScreen messages={session.Message} session={session} />
          </div>
        )}
      </div>
    </main>
  );
}
