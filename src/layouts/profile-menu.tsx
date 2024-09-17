"use client";

import LogsButton from "@/components/settings/logs-button";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { Title, Text } from "@/components/ui/text";
import { routes } from "@/config/routes";
import cn from "@/utils/class-names";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar } from "rizzui";

function DropdownMenu() {
  const { data: session } = useSession();
  const role = session?.user.user.roles?.map(
    (item: { name: string }) => item.name
  );
  const [, setOpenLogsDrawer] = useState(false);

  const menuItems = [
    {
      name: "My Profile",
      href: "route",
      isDrawer: false,
    },

    session?.user?.permissions.includes("audit") && {
      name: "Activity Log",
      href: routes.home.activityLogs,
      isDrawer: true,
    },
  ];

  return (
    <div className="w-full text-left rtl:text-right bg-white">
      <div className="flex items-center border-b border-gray-300 px-6 pb-5 pt-6">
        {session && (
          <Avatar
            name={session?.user?.user.first_name}
            initials={session?.user?.user.first_name[0].toUpperCase()}
            color="secondary"
          />
        )}
        <div className="ms-3">
          <Title as="h6" className="font-semibold whitespace-nowrap">
            {session?.user?.user.name}
          </Title>
          <Text className="text-gray-600">{session?.user.user.email}</Text>
        </div>
      </div>
      <div className="grid px-3.5 py-3.5 font-medium text-gray-700">
        {menuItems.map((item) =>
          item && item.href ? (
            <Link
              key={item.name}
              href={item.href}
              className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
            >
              {item.name}
            </Link>
          ) : (
            item && (
              <LogsButton
                btnName={item.name}
                onClose={() => setOpenLogsDrawer(false)}
              />
            )
          )
        )}
      </div>
      <div className="border-t border-gray-300 px-6 pb-6 pt-5">
        <Button
          className="h-auto w-full z-50 justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900  focus-visible:ring-0"
          variant="text"
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}

export default function ProfileMenu({
  buttonClassName,
  avatarClassName,
}: {
  buttonClassName?: string;
  avatarClassName?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Popover overlayClassName="bg-white z-50" placement="bottom">
      <Popover.Trigger >
        <div className="w-12 cursor-pointer">
          <Avatar
            src={""}
            name={session?.user?.user.first_name ?? ""}
            initials={session?.user?.user.first_name[0].toUpperCase()}
            className={cn("!h-9 w-9 sm:!h-10 sm:w-10", avatarClassName)}
          />
        </div>
      </Popover.Trigger>

      <Popover.Content className="w-32 bg-white">{({ setOpen }) => <DropdownMenu />}</Popover.Content>
    </Popover>

    // <Popover
    //   isOpen={isOpen}
    //   setIsOpen={setIsOpen}
    //   content={() => <DropdownMenu />}
    //   shadow="sm"
    //   placement="bottom-end"
    //   className="z-50 p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100"
    // >
    //   <button
    //     className={cn(
    //       "w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10",
    //       buttonClassName
    //     )}
    //   >
    //     {session?.user?.user && (
    //       <Avatar
    //         src={""}
    //         name={session?.user?.user.first_name}
    //         initials={session?.user?.user.first_name[0].toUpperCase()}
    //         className={cn("!h-9 w-9 sm:!h-10 sm:w-10", avatarClassName)}
    //       />
    //     )}
    //   </button>
    // </Popover>
  );
}

// eturn (
//   <Popover enableOverlay>
//     <Popover.Trigger>
//       <div className="w-12 cursor-pointer">
//         <Avatar
//           name="Jane Doe"
//           src="https://randomuser.me/api/portraits/women/40.jpg"
//           size="lg"
//         />
//       </div>
//     </Popover.Trigger>
//     <Popover.Content>
//       {({ setOpen }) => (
//         <div className="font-geist">
//           <div className="mb-3 flex items-center gap-3">
//             <Avatar
//               name="John Doe"
//               src="https://randomuser.me/api/portraits/women/40.jpg"
//               className="ring-2 ring-blue ring-offset-2"
//               size="lg"
//             />
//             <div>
//               <Text className="text-base font-semibold text-gray-900">
//                 Fred Chaparro
//               </Text>
//               <Text className="text-sm text-gray-500">@fredchaparro</Text>
//             </div>
//           </div>
//           <div className="max-w-[240px] text-sm">
//             <Text className="text-gray-700">
//               Full-stack Developer, love to work with @redq. 🎉{" "}
//             </Text>
//             <div className="mt-3 inline-flex gap-3 text-gray-500">
//               <Text>
//                 <Text as="span" className="font-medium text-gray-700">
//                   8
//                 </Text>{" "}
//                 Following
//               </Text>
//               <Text>
//                 <Text as="span" className="font-medium text-gray-700">
//                   10.5k
//                 </Text>{" "}
//                 Followers
//               </Text>
//             </div>
//           </div>
//           <Button
//             className="mt-4 w-full"
//             size="sm"
//             onClick={() => setOpen(false)}
//           >
//             Follow
//           </Button>
//         </div>
//       )}
//     </Popover.Content>
//   </Popover>
