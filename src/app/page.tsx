"use client";
import PageLoader from "@/components/loader/page-loader";
import { routes } from "@/config/routes";
import { Role } from "@/constants/role.enum";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log("--------->",session)

  if (status === "loading") return <PageLoader />;
  if (
    session?.user?.user?.roles
      ?.map((item: {Name: string }) => item.Name)
      .includes(Role.ADMIN)
  ) {
    return router.push(routes.home.dashboard);
  }

  return signOut();
};

export default Home;
