import { routes } from "@/config/routes";
import { PiFileImageDuotone } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePlace } from "react-icons/md";
import {
  menuItemtype,
  subMenuItemtype,
} from "types/common_types";

// export const MenuItems = [
//   {
//     name: "Dashboard",
//     href: routes.home.dashboard,
//     icon: <PiFileImageDuotone />,
//   },
//   {
//     name: "Members",
//     href: "#",
//     icon: <CiUser />,
//     dropdownItems: [
//       {
//         name: "List",
//         href: routes.home.users,
//       },
//     ],
//   },
//   {
//     name: "User Settings",
//     href: "#",
//     icon: <IoSettingsOutline />,
//     dropdownItems: [
//       {
//         name: "Permissions",
//         href: routes.home.userSettings.permissions,
//       },
//       {
//         name: "Roles",
//         href: routes.home.userSettings.roles,
//       },
//     ],
//   },
// ];

export const getMenuItems = (userPermissions: string[] | undefined | null) => {
  if (!userPermissions) {
    return [];
  }

  const menuItems: menuItemtype[] = [
    {
      name: "Dashboard",
      href: routes.home.dashboard,
      icon: <PiFileImageDuotone />,
    },
  ];

  if (
    userPermissions.includes("read:role") ||
    userPermissions.includes("read:permission")
  ) {
    const subItems: subMenuItemtype[] = [];

    userPermissions.includes("read:permission") &&
      subItems.push({
        name: "Permissions",
        href: routes.home.userSettings.permissions,
      });

    userPermissions.includes("read:role") &&
      subItems.push({
        name: "Roles",
        href: routes.home.userSettings.roles,
      });

    menuItems.push({
      name: "User Settings",
      href: "#",
      icon: <IoSettingsOutline />,
      dropdownItems: subItems,
    });
  }

  if (userPermissions.includes("read:branch")) {
    menuItems.push({
      name: "Branches",
      href: routes.home.branches,
      icon: <MdOutlinePlace />,
    });
  }

  return menuItems;
};
