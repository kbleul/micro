"use client";
import { useIsMounted } from "@/hooks/use-is-mounted";
import MainLayout from "@/layouts/layout";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMounted = useIsMounted();
  const { data: session } = useSession();

  useEffect(() => {
    if (isMounted && !session) {
      window.location.href = "/";
    }
  }, [isMounted, session]);


  if (!isMounted) {
    return null;
  }

  return <MainLayout>{children}</MainLayout>;
}
