export type subMenuItemtype = {
  name: string;
  href: string;
};

export type menuItemtype = {
  name: string;
  href: string;
  icon: React.ReactNode;
  dropdownItems?: Array<subMenuItemtype>;
};

export type permissionType = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
};

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
  id: string;
  name: string;
  slug: string;
};

export type memberType = {
  id: string;
  full_name: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  phone_number: string;
  age: number;
  birth_date: string;
  gender: string;
  photo: string;
  account: { id: string; number: string; status: string };
  accounts: {
    id: string;
    number: string;
    status: string;
    balance: number;
    account_type: {
      id: string;
      name: string;
      interest_rate: number;
      interest_period: string;
      penalty_rate: number;
      saving_period: string;
      minimum_threshold: number
    };
  }[];
  marriage_status: string;
  birth_place: string;
  birth_district: string;
  birth_neighborhood: string;
  birth_zone: string;
  birth_subcity: string;
  birth_region: string;
  birth_house_number: string;
  current_region: string;
  current_district: string;
  current_neighborhood: string;
  current_zone: string;
  current_subcity: string;
  current_house_number: string;
};
