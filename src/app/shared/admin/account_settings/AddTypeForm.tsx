"use client";
import React from "react";
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
import { PiXBold } from "react-icons/pi";

import { periodOptions } from "@/utils/dummy";
import CustomSelect from "@/components/ui/form/select";
import { useSession } from "next-auth/react";
import {
  InterstTermSchema,
  InterstTypeType,
} from "@/validations/account_type.schema";

const AddTypeForm = ({
  id,
  className,
}: {
  id?: string;
  className?: string;
}) => {
  const headers = useGetHeaders({ type: "Json" });
  const { data: session } = useSession();

  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const { closeModal } = useModal();


  const interstTermsData = useFetchData(
    [queryKeys.getInterstTerms, id],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}interest-terms`,
    headers,
  );
 
  const typesData = useFetchData(
    [queryKeys.getAccountTypes + id, id],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}account-types/${id}`,
    headers,
    !!id
  );

  if (typesData.isFetching || interstTermsData.isFetching ) {
    return <Loading />;
  }

  const initialValues: InterstTypeType = {
    name: id ? typesData?.data?.data?.name : "",
    minimum_threshold: id ? typesData?.data?.data?.minimum_threshold : 0,
    interest_term_id: id ? typesData?.data?.data?.interest_term_id : 0,
  };

  const createTermSubmitHandler = async (values: InterstTypeType) => {
    try {
      await postMutation.mutateAsync({
        url: id
          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}account-types/${id}`
          : `${process.env.NEXT_PUBLIC_BACKEND_URL}account-types`,
        method: "POST",
        headers,
        body: {
          ...values,
          _method: id ? "PATCH" : "POST",
        },
        onSuccess: (res: any) => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAccountTypes],
          });

          toast.success(
            id ? "Account type updated Successfully" : "Account type created Successfully"
          );
          closeModal();
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(
    "//////////////////////",
    session?.user?.permissions.includes("update:account-type")
  );

  return (
    <article className="p-8 pb-28">
      <div className="flex items-center justify-end">
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={InterstTermSchema}
        onSubmit={(values: InterstTypeType) => createTermSubmitHandler(values)}
      >
        {({ setFieldValue }) => {
          return (
            <Form className={"[&_label.block>span]:font-medium "}>
              <Title as="h4" className="border-b mb-4 pb-1">
                {id ? "Edit Account Type" : "Add Account Type"}
              </Title>

              <FormikInput
                name="name"
                label="Account type"
                placeholder="Enter the term name"
                color="primary"
                className="mb-4"
              />
            
              <FormikInput
                name="minimum_threshold"
                label="Minimum Threshold"
                placeholder="Enter the minumum threshold"
                color="primary"
                className="mb-4"
                type="number"
              />

              <div className="mt-4 w-full flex flex-col gap-6 ">
                <CustomSelect
                  isSearchable
                  name="interest_term_id"
                  label="Interest Term"
                  options={interstTermsData?.data?.data?.interestTerms}
                  onChange={(selectedOption: any) => {
                    setFieldValue("interest_term_id", selectedOption.id);
                  }}
                  placeholder="select interest term"
                  getOptionValue={(interest_term_id: any) => interest_term_id?.id}
                  getOptionLabel={(interest_term_id: any) => interest_term_id?.name}
                  noOptionsMessage={() => "Fetching terms..."}
                  defaultValue={interstTermsData?.data?.data?.interestTerms.filter(
                    (p: any) => p.id === typesData?.data?.data?.interest_term_id
                  )}
                />
              </div>

              {(session?.user?.permissions.includes("update:account-type") ||
                session?.user?.permissions.includes("update:account")) && (
                <div className="col-span-2 flex items-end justify-end gap-4 mt-10">
                  <Button
                    color="primary"
                    className="px-10 text-white bg-primary-dark"
                    type="submit"
                    isLoading={postMutation.isPending}
                  >
                    {id ? "Update" : "Create"}
                  </Button>
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </article>
  );
};

export default AddTypeForm;
