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