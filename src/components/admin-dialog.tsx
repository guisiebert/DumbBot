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
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CircleAlertIcon, FileWarningIcon } from "lucide-react";

export function AdminDialog() {
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"} className="min-h-12 w-full text-base">
          Admin area
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card flex max-w-[400px] flex-col items-center">
        <div className="-mt-10 rounded-full bg-red-600">
          <CircleAlertIcon color="white" size={40} />
        </div>

        <DialogTitle>Authorized users only</DialogTitle>

        <DialogDescription className="text-center">
          Welcome to our extremely advanced auth screen. It uses cutting-edge
          social technology of authentication - we call it human trust.
        </DialogDescription>
        <Link href={"/admin"}>
          <Button className="min-h-12 w-full text-base">
            Yes, I'm authorized and I'm not lying
          </Button>
        </Link>
      </DialogContent>
    </Dialog>
  );
}
