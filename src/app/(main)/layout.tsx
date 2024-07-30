"use client";
import { useIsMounted } from "@/hooks/use-is-mounted";
import MainLayout from "@/layouts/layout";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return <MainLayout>{children}</MainLayout>;
}
