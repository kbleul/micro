"use client";
import React from "react";
import Logo from "../../../../../public/logo.png";

import FormikInput from "@/components/ui/form/input";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";

import { Formik, Form } from "formik";

import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import useDynamicMutation from "@/react-query/usePostData";
import { ActionIcon, Button, Title } from "rizzui";
import { useFetchData } from "@/react-query/useFetchData";
import { useModal } from "@/app/shared/modal-views/use-modal";
import Loading from "@/components/ui/Loading";
import { RoleType, RoleSchema } from "@/validations/role.schema";
import { PiXBold } from "react-icons/pi";

import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  header: {
    width: "100%",
  },
  page: {
    flexDirection: "row",
    display: "flex",
    width: "100%",
  },
  headerItemsSide: {
    width: "30%",
    margin: 10,
    padding: 10,
    flexGrow: 1,

  },
  headerItemsMiddle: {
    width: "40%",
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  logo: {
    width: "40%",
    height: "10rem",
    margin: 10,
    padding: 10,
    flexGrow: 1,
  }
});

const ViewDepositInvoice = () => {
  const headers = useGetHeaders({ type: "FormData" });
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const { closeModal } = useModal();

  //   const rolesData = useFetchData(
  //     [queryKeys.getAllRoles + id, id],
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}user-roles/show/${id}`,
  //     headers,
  //     !!id
  //   );

  //   if (rolesData.isFetching) {
  //     return <Loading />;
  //   }

  //   const initialValues: RoleType = {
  //     name: id ? rolesData.data.data.role.name : "",
  //   };

  return (
    <article className="p-8 bg-[#fffefc] w-full border">
      <div className="flex items-center justify-end">
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>

      <Document style={styles.header}>
        <Page size="A4" style={styles.page}>
          <View style={styles.headerItemsSide} >
            <Text>Section #1</Text>
            <Image source={"https://dummyimage.com/300.png/09f/fff"} style={styles.logo}  />
          </View>
          <View style={styles.headerItemsMiddle} >
            <Text>Section #2</Text>
          </View>
          <View style={styles.headerItemsSide} >
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>
    </article>
  );
};

export default ViewDepositInvoice;
