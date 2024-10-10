"use client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import { signOut } from "next-auth/react";

interface Header extends AxiosRequestConfig {
  headers: {
    "Content-Type": string;
    Accept: string;
    Authorization: string | undefined;
  };
}
export const useFetchData = (
  queryKey: (string | number | boolean | undefined | null | any)[],
  url: string,
  headers: Header["headers"],
  enabled?: boolean
) => {
  const token = "token";
  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      try {
        const response = await axios.get(`${url}`, { headers });
        return response.data;
      } catch (error: any) {
       
      return  handleErrorCodes(error.response)
      }
    },
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
    retry: true,
    enabled: !!token && enabled,
  });
};

const handleErrorCodes = (response: any) => {
  switch (response.status) {
    case 404:
      return { error: "Page not found", code: response.status };

    case 401:
      signOut();
      return { error: response.data, code: response.status };

    case 403:
      return { error: "You don't have all the neccessay permissions for this action. Please contact the admin to gain full access", code: response.status };

    default:
      break;
  }
};
