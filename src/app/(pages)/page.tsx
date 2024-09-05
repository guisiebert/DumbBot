import { HydrateClient } from "@/trpc/server";
import { NewChat } from "@/components/new-chat-dialog";
import Image from "next/image";
import { AdminDialog } from "@/components/admin-dialog";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="flex h-[36rem] w-[30rem] flex-col items-center justify-center gap-8 rounded-lg bg-card p-6">
          <Image
            src={"/DumbBot.png"}
            width={225}
            height={225}
            alt="DumbBot Logo"
            className="rounded-full"
            priority
          />

          <h1 className="text-3xl font-bold tracking-tight">DumbBot</h1>

          <p className="text-center font-light">
            Definitely not the smartest chatbot, <br /> but always at your
            disposal.
          </p>

          <div className="flex w-full max-w-72 flex-col items-stretch gap-2">
            <NewChat />
            <AdminDialog />
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
