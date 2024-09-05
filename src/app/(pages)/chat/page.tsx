"use client";
import { useChat } from "@/context/chat-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { api } from "@/trpc/react";
import { BotIcon, SendHorizontalIcon, User2Icon, XIcon } from "lucide-react";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Message = {
  id?: number;
  createdAt?: Date;
  content: string;
  author: "USER" | "BOT";
  sessionId: number;
};

export default function Chat() {
  const router = useRouter();
  const { session, addMessage } = useChat();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const isEmpty = messages.length === 0;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const createMessage = api.message.create.useMutation({
    onSuccess(data) {
      // Add the new user message to the context
      addMessage({
        content: newMessage,
        author: "USER",
        createdAt: data.createdAt,
      });

      // Fetch the bot response
      serverMessages.refetch();
    },
  });

  if (!session) {
    router.push("/");
  }

  const serverMessages = api.message.getMessagesBySessionId.useQuery({
    sessionId: session?.id!,
  });

  const textSuggestions = [
    "Who will win the elections?",
    "Should I buy ETH?",
    "What should I eat today?",
    "How to find happiness?",
  ];

  async function handleSendMsg(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessages((prev) => [
      ...prev,
      {
        author: "USER",
        content: newMessage,
        sessionId: session?.id!,
      },
    ]);

    if (newMessage.trim() !== "") {
      createMessage.mutate({
        content: newMessage,
        sessionId: session!.id,
      });
      setNewMessage("");
    }
  }

  // Update messages when the server query changes
  useEffect(() => {
    if (serverMessages.data) {
      setMessages(serverMessages.data);
    }
  }, [serverMessages.data]);

  // Scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (session)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="flex h-[36rem] w-[30rem] flex-col gap-4 rounded-lg bg-card p-6">
          <header className="flex w-full items-center gap-2">
            <BotIcon strokeWidth={3} className="size-10 text-accent" />
            <h2 className="text-lg font-bold">DumbBot</h2>
            <Link href={"/"} className="ml-auto">
              <XIcon strokeWidth={4} className="text-foreground" />
            </Link>
          </header>

          {/* IF EMPTY STATE: LOGO */}
          {isEmpty && (
            <div className="my-auto flex flex-col items-center gap-4">
              <Image
                src={"/DumbBot.png"}
                width={90}
                height={90}
                alt="DumbBot Logo"
                className="rounded-full"
              />
              <p className="font-light text-muted">How can I be of help?</p>
            </div>
          )}

          {/* IF EMPTY STATE: SESSION INFO */}
          {isEmpty && (
            <div className="flex flex-col gap-0">
              <h2 className="text-2xl font-bold">Hello {session?.username}</h2>
              <small className="max-w-72 font-light">
                What would you like to learn today? I'm ready to give you
                guidance on your deepest questions.{" "}
              </small>
            </div>
          )}

          {/* MESSAGES LIST */}
          {!isEmpty && (
            <div className="h-full flex-col justify-end overflow-y-scroll pt-4">
              {messages.map((msg) =>
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
                      {session.username}
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

                      <div className="flex size-9 items-center justify-center rounded bg-secondary text-foreground">
                        <User2Icon />
                      </div>
                    </div>
                  </div>
                ),
              )}

              {/* EndRef to allow auto-scrolling to new messages*/}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* MESSAGE SUGESTIONS */}
          <div className="no-scrollbar transpare flex gap-2 overflow-x-auto text-nowrap">
            {textSuggestions.map((suggestion) => (
              <Badge
                key={suggestion}
                variant={"suggestion"}
                onClick={() => {
                  setMessages((prev) => [
                    ...prev,
                    {
                      author: "USER",
                      content: suggestion,
                      sessionId: session?.id!,
                    },
                  ]);

                  createMessage.mutate({
                    content: suggestion,
                    sessionId: session!.id,
                  });
                }}
              >
                {suggestion}
              </Badge>
            ))}
          </div>

          {/* WRITE MESSAGE INPUT */}
          <form className="flex gap-4" onSubmit={handleSendMsg}>
            <Input
              placeholder="Ask me anything..."
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
              className="bg-input p-3 py-6"
            />
            <Button type="submit" variant={"secondary"} className="h-full">
              <SendHorizontalIcon strokeWidth={2.5} />
            </Button>
          </form>
        </div>
      </main>
    );
}
