import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      user: {
        id: string;
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        name: string;
        gender: null | string;
        dob: null | string;
        created_at: string;
        updated_at: string;
        profile_image: string;
        need_create_password: boolean;
        roles: {
          uuid: string;
          Name: string;
        }[];
      };
      token: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    roles: {
      uuid: string;
      Name: string;
    }[];
    user: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      name: string;
      gender: null | string;
      dob: null | string;
      created_at: string;
      updated_at: string;
      profile_image: string;
      need_create_password: boolean;
      roles: {
        uuid: string;
        Name: string;
      }[];
      token: string;
    } & DefaultSession["user"];
  }
}
