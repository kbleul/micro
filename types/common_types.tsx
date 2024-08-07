export type subMenuItemtype = {
    name: string;
    href: string,
}

export type menuItemtype = {
    name: string,
    href: string,
    icon: React.ReactNode,
    dropdownItems?: Array<subMenuItemtype>,
}

export type permissionType = {
    id: string,
    name: string,
    slug: string,
    createdAt: string,
}

export type branchType = {
    id: string;
    name: string;
    phone_number: string;
    email: string;
    city: string;
    region: string;
    address: string;
    ManagerID?: {
      id: string;
      full_name: string;
    } | null;
    
  };

  export type roleTypes = {
    id: string,
    name: string,
    slug: string,
  }