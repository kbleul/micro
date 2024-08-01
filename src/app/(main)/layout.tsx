"use client";
import { useIsMounted } from "@/hooks/use-is-mounted";
import MainLayout from "@/layouts/layout";
import { useSession } from "next-auth/react";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMounted = useIsMounted();
  const { data: session } = useSession();

  if (!isMounted) {
    return null;
  }

  console.log(session);

  return <MainLayout>{children}</MainLayout>;
}
