import { routes } from "@/config/routes";
import { PiFileImageDuotone } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePlace } from "react-icons/md";
import { menuItemtype, subMenuItemtype } from "types/common_types";
import { FaUsers } from "react-icons/fa";
import { RiMailSettingsLine } from "react-icons/ri";
import { LuUsers2 } from "react-icons/lu";
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

    // userPermissions.includes("read:permission") &&
    //   subItems.push({
    //     name: "Permissions",
    //     href: routes.home.userSettings.permissions,
    //   });

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

  if (userPermissions.includes("read:employee")) {
    menuItems.push({
      name: "Employees",
      href: routes.home.employees.view_all,
      icon: <FaUsers />,
    });
  }

  if (userPermissions.includes("read:branch")) {
    menuItems.push({
      name: "Branches",
      href: routes.home.branches.view_all,
      icon: <MdOutlinePlace />,
    });
  }

  if (
    userPermissions.includes("read:account-type") ||
    userPermissions.includes("read:account")
  ) {
    const subItems: subMenuItemtype[] = [];

    // subItems.push({
    //   name: "Interest Terms",
    //   href: routes.home.accountSettings.interst_terms,
    // });

    subItems.push({
      name: "Saving Types",
      href: routes.home.accountSettings.account_types,
    });

    menuItems.push({
      name: "Account Settings",
      href: "#",
      icon: <RiMailSettingsLine />,
      dropdownItems: subItems,
    });
  }

  if (userPermissions.includes("read:account")) {
    menuItems.push({
      name: "Members",
      href: routes.home.members.view_all,
      icon: <LuUsers2 />,
    });
  }



  return menuItems;
};
