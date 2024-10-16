import { routes } from "@/config/routes";
import { PiFileImageDuotone, PiQueue } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineApproval, MdOutlinePlace } from "react-icons/md";
import { menuItemtype, subMenuItemtype } from "types/common_types";
import { FaUsers } from "react-icons/fa";
import { RiMailSettingsLine } from "react-icons/ri";
import { LuUsers2 } from "react-icons/lu";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { IoMdReturnRight } from "react-icons/io";

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

    userPermissions.includes("read:role") &&
      subItems.push({
        name: "Roles",
        href: routes.home.userSettings.roles,
      });

    userPermissions.includes("manage:settings") &&
      subItems.push({
        name: "Approval Setup",
        href: routes.home.userSettings["approval-setup"],
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
    userPermissions.includes("read:account") || userPermissions.includes("read:share")
  ) {
    const subItems: subMenuItemtype[] = [];
    (userPermissions.includes("read:account-type") ||
    userPermissions.includes("read:account")) && subItems.push({
      name: "Saving Types",
      href: routes.home.accountSettings.account_types,
    });

    userPermissions.includes("read:share") && subItems.push({
      name: "Share Info",
      href: routes.home.accountSettings.share,
    });


 

    menuItems.push({
      name: "Account Settings",
      href: "#",
      icon: <RiMailSettingsLine />,
      dropdownItems: subItems,
    });
  }

  if (
    userPermissions.includes("read:account") ||
    userPermissions.includes("create:account")
  ) {
    const subItems: subMenuItemtype[] = [];

    userPermissions.includes("read:account") &&
      subItems.push({
        name: "View Members",
        href: routes.home.members.view_all,
      });

    userPermissions.includes("create:account") &&
      subItems.push({
        name: "Add Member",
        href: routes.home.members["add-member"],
      });

    userPermissions.includes("read:account") &&
      menuItems.push({
        name: "Members",
        href: routes.home.members.view_all,
        icon: <LuUsers2 />,
        dropdownItems: subItems,
      });
  }

  if (
    userPermissions.includes("manage:settings") ||
    userPermissions.includes("read:loan")
  ) {

    userPermissions.includes("manage:settings") &&
      menuItems.push({
        name: "Approval Requests",
        href: routes.home.approvalRequests,
        icon: <MdOutlineApproval />,
      });

    userPermissions.includes("read:loan") &&
      menuItems.push({
        name: "Loan Queue",
        href: routes.home.loanQueue,
        icon: <PiQueue size="25" />,
      });

      userPermissions.includes("read:loan") &&
      menuItems.push({
        name: "Dispurse Loan",
        href: routes.home.dispurseLoan,
        icon: <IoMdReturnRight size="25" />,
      });
  }

  

  return menuItems;
};
