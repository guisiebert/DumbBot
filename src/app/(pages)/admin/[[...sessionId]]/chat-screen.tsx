"use client";
import { Message, Session } from "@/context/types";
import { BotIcon, User2Icon, UserIcon } from "lucide-react";
import { useRef } from "react";

export function ChatScreen({
  messages,
  session,
}: {
  messages: Message[];
  session: Session;
}) {
  return (
    <div className="flex h-full w-[30rem] flex-col gap-4">
      <header className="flex items-center gap-4">
        <UserIcon className="size-12 rounded-md bg-accent" />
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">
            Conversation with {session?.username}
          </h2>
          <small className="max-w-72 font-light">
            Session started in {session.createdAt.toLocaleDateString()} at{" "}
            {session.createdAt.toLocaleTimeString()}
          </small>
        </div>
      </header>

      {messages.length == 0 && (
        <div className="flex h-full items-center justify-center rounded-lg bg-white/50">
          <p className="font text-muted">This session has no messages.</p>
        </div>
      )}

      {messages.length > 0 && (
        <div className="flex h-full flex-col gap-4 overflow-y-scroll rounded-lg bg-white px-6 py-4">
          <div className="h-full flex-col justify-end">
            {messages &&
              messages.map((msg) =>
                msg.author == "BOT" ? (
                  <div className="space-y-1">
                    <small className="font-semibold text-foreground/70">
                      DumbBot
                    </small>
                    <div className="my-4 flex gap-2">
                      <div className="flex size-9 items-center justify-center rounded bg-foreground">
                        <BotIcon color="white" />
                      </div>
                      <div>
                        <p
                          key={msg.id}
                          className="mr-auto max-w-80 rounded bg-foreground p-2 text-left text-sm font-light text-card"
                        >
                          {msg.content}
                        </p>
                        <small className="text-xs text-muted">
                          {msg.createdAt.toLocaleTimeString()}
                        </small>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-end space-y-1">
                    <small className="font-semibold text-foreground/70">
                      {session?.username}
                    </small>
                    <div className="my-4 flex justify-end gap-2">
                      <div className="flex flex-col items-end gap-1">
                        <p
                          key={msg.id}
                          className="mr-auto max-w-80 rounded bg-accent p-2 text-left text-sm font-light text-foreground"
                        >
                          {msg.content}
                        </p>
                        <small className="text-xs text-muted">
                          {msg.createdAt.toLocaleTimeString()}
                        </small>
                      </div>

                      <div className="flex size-9 items-center justify-center rounded bg-secondary text-white">
                        <User2Icon />
                      </div>
                    </div>
                  </div>
                ),
              )}
          </div>
        </div>
      )}
    </div>
  );
}
