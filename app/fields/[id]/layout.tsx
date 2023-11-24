"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";

const FieldLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (!session && status !== "loading") {
    toast({
      title: "Error - Not logged in",
      description: "You must be logged in to access this page.",
      variant: "destructive",
    });

    return router.push("/");
  }

  return <div>{children}</div>;
};

export default FieldLayout;
