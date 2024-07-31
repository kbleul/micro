import { routes } from "@/config/routes";
import { PiFileImageDuotone } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";

export const MenuItems = [

  {
    name: "Dashboard",
    href: routes.home.dashboard,
    icon: <PiFileImageDuotone />,
  },
  {
    name: "Members",
    href: "#",
    icon: <CiUser />,
    dropdownItems: [
      {
        name: "List",
        href: routes.home.users,
      },
    ],
  },
  {
    name: "User Settings",
    href: "#",
    icon: <IoSettingsOutline />,
    dropdownItems: [
      {
        name: "Permissions",
        href: routes.home.userSettings.permissions,
      },
      {
        name: "Roles",
        href: routes.home.userSettings.roles,
      },
    ],
  },
];


const getMenuItems = (userPermissions : string[]) => {
  
}
