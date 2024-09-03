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
  spouse_name: string | null;
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
      minimum_threshold: number;
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
  children:
    | {
        age: number;
        gender: string;
      }[]
    | null;
  heirs:
    | {
        first_name: string;
        last_name: string;
        address: string;
        city: string;
        house_number: string;
        occupation: string;
        phone_number: string;
        relationship: string;
        subcity: string;
        woreda: string;
        zone: string;
      }[]
    | null;
  emergency_contacts:
    | {
        first_name: string;
        last_name: string;
        address: string;
        city: string;
        house_number: string;
        occupation: string;
        phone_number: string;
        relationship: string;
        subcity: string;
        woreda: string;
        zone: string;
        kebele: string;
      }[]
    | null;
};

export type ActivityLogsType = {
  id: string;
  user_id: string;
  user_name: string;
  action_type: string;
  entity: string;
  entity_id: string;
  previous_state: {
    id: string;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
    permissions: null;
  };
  new_state: {
    id: string;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
    permissions: null;
  };
  ip_address: string;
  user_agent: string;
  location: string;
  description: string;
  timestamp: string;
};

export type workflowStepType = {
  created_at: string;
  id: string;
  name: string;
  roles: {
    id: string;
    role_name: string;
    role_id: string;
  }[] | null;
  step_number: number;
};
export type workflowType = {
  application_id: string;
  created_at: string;
  description: string;
  id: string;
  name: string;
  steps: workflowStepType[];
  updated_at: string;
};
