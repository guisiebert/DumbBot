"use client";
import { api } from "@/trpc/react";
import { createContext, useContext, useState, useEffect } from "react";
import type { ChatContext, Message, Session } from "./types";

// Create the context
const ChatContext = createContext({} as ChatContext);

// Create a custom hook
export const useChat = () => useContext(ChatContext);

// Create Provider
export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [session, setSession] = useState<Session | null>(null);

  const getMessages = api.message.getMessagesBySessionId.useQuery(
    { sessionId: session?.id! },
    { enabled: !!session },
  );

  // Function to add a new message to the context
  function addMessage(newMessage: Message) {
    setMessages([...messages, newMessage]);
    setMessages(getMessages.data!);
  }

  // Function to create a new session
  function startSession(session: Session) {
    setSession(session);
    setMessages([]);
  }

  return (
    <ChatContext.Provider
      value={{
        messages,
        session,
        addMessage,
        startSession,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
