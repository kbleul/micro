"use client";
import { routes } from "@/config/routes";
import { useIsMounted } from "@/hooks/use-is-mounted";
import MainLayout from "@/layouts/layout";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMounted = useIsMounted();
  const { data: session } = useSession();
  const router = useRouter();

  if (!isMounted) {
    return null;
  }

  console.log(session);

  if (!session) {
    router.push(routes.signIn);
  }

  return <MainLayout>{children}</MainLayout>;
}
