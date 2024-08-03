"use client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";

interface Header extends AxiosRequestConfig {
  headers: {
    "Content-Type": string;
    Accept: string;
    Authorization: string;
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
        if (error.response.data.code === 401) {
          return { error: error.response.data };
        }
      }
    },
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
    retry: true,
    enabled: !!token && enabled,
  });
};