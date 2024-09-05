"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";

import { SendHorizontal, SendIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useChat } from "@/context/chat-context";
import Image from "next/image";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

export function NewChat() {
  const router = useRouter();
  const { startSession } = useChat();
  const newSession = api.session.create.useMutation({
    onSuccess(data) {
      startSession(data);
      router.push("/chat");
    },
  });
  const [username, setUsername] = useState("");

  function handleStart() {
    newSession.mutate({
      username,
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="min-h-12 w-full text-base">Start new chat</Button>
      </DialogTrigger>
      <DialogContent className="flex max-w-[400px] flex-col items-center bg-card">
        <Image
          src={"/DumbBot.png"}
          width={80}
          height={80}
          alt="DumbBot Logo"
          className="-mt-16 rounded-full"
        />

        <DialogTitle>Welcome to DumbBot</DialogTitle>

        <DialogDescription className="text-center">
          DumbBot is excited to meet you. <br /> Please inform your name.
        </DialogDescription>

        <form
          className="my-4 flex gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            newSession.mutate({
              username,
            });
          }}
        >
          <Input
            id="name"
            placeholder="Your name"
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Button variant={"secondary"} type="submit" className="h-13">
            <SendHorizontal strokeWidth={2.5} />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
