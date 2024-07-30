import { signOut } from "next-auth/react";
import Loading from "../components/ui/Loading";
import React from "react";


export const handleFetchState = (fetchState: {isPending: boolean, isFetching: boolean, data?: {error?: {code: number, message: string}}}) => {
    if (fetchState.isPending || fetchState.isFetching) {
      return <Loading />;
    }
  
    if (fetchState?.data?.error) {
      return signOut();
    }
  
    return null;
  };

  
export const HandleFetchState = (fetchState: {isPending: boolean, isFetching: boolean, data?: {error?: {code: number, message: string}}}) => {
   return <></>
  };
  

  export default HandleFetchState