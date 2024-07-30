"use client";

import Link from "next/link";

import HamburgerButton from "@/layouts/hamburger-button";
import Sidebar from "@/layouts/sidebar";

import cn from "@/utils/class-names";
import Logo from "@/components/logo";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { useWindowScroll } from "@/hooks/use-window-scroll";
import ProfileMenu from "./profile-menu";
import SettingsButton from "@/components/settings/settings-button";

function HeaderMenuRight() {
  return (
    <div className=" ms-auto grid shrink-0 grid-cols-2 items-center gap-2 text-gray-700 xs:gap-3 xl:gap-4">
      <SettingsButton />
      <ProfileMenu />
    </div>
  );
}

export default function Header() {
  const isMounted = useIsMounted();
  const windowScroll = useWindowScroll();
  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex flex-col items-center bg-gray-0/80 px-4 py-4 backdrop-blur-xl dark:bg-gray-50/50 md:px-5 lg:px-6 2xl:py-5 3xl:px-8 4xl:px-10",
        ((isMounted && windowScroll.y) as number) > 2 ? "card-shadow" : ""
      )}
    >
      <article className="w-full flex ">
        <div className="flex  w-full max-w-2xl items-center">
          <div className="flex items-center">
            <HamburgerButton
              view={<Sidebar className="static w-full 2xl:w-full" />}
            />

            <Link href={"/"} aria-label="Site Logo">
              <Logo className="w-full me-4 h-7 shrink-0 lg:me-5 xl:hidden" />
            </Link>
          </div>
        </div>

        <HeaderMenuRight />
      </article>
    </header>
  );
}
