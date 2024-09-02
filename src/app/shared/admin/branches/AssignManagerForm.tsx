"use client";
import * as Yup from "yup";

import React from "react";
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
import CustomSelect from "@/components/ui/form/select";
import { useSession } from "next-auth/react";
import { branchType } from "types/common_types";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";

type AssignType = {
  manager_id: string;
};

export const BranchSchema = Yup.object().shape({
  manager_id: Yup.string().required("Manager is required"),
});

const AssignManagerForm = ({
  branch,
}: {
  branch: branchType;
}) => {
  const headers = useGetHeaders({ type: "Json" });
  const { data: session } = useSession();
  const router = useRouter();

  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const { closeModal } = useModal();

  const managersData = useFetchData(
    [queryKeys.getAllEmployees + "manager"],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}users/roles/manager`,
    headers
  );

  if (managersData.isFetching) {
    return <Loading />;
  }


  const managersList:any[] = managersData?.data?.data?.users ?? []

  const initialValues: AssignType = {
    manager_id: "",
  };

  const assignSubmitHandler = async (values: AssignType) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}branches/${branch?.id}/assign-manager`,
        method: "POST",
        headers,
        body: {
          ...values,
          _method: "POST",
        },
        onSuccess: (res: any) => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllBranches + branch?.id ],
          });

          

          toast.success("Term updated Successfully");
          closeModal();

          router.push(routes.home.branches.view_all);

        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <article className="p-8 pb-28">
      <div className="flex items-center justify-end">
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={BranchSchema}
        onSubmit={(values: AssignType) => assignSubmitHandler(values)}
      >
        {({ setFieldValue }) => {
          return (
            <Form className={"[&_label.block>span]:font-medium "}>
              <Title as="h4" className="border-b mb-4 pb-1">
                {"Assign Manager"}
                <p className="text-sm font-light">For : {branch?.name}</p>
              </Title>

              <div className="mt-4 w-full flex flex-col gap-6 ">
                <CustomSelect
                  isSearchable
                  name="manager_id"
                  label="manager"
                  options={managersList}
                  onChange={(selectedOption: any) => {
                    setFieldValue("manager_id", selectedOption.id);
                  }}
                  placeholder="Select manager"
                  getOptionValue={(manager: any) => manager?.id}
                  getOptionLabel={(manager: any) => manager?.full_name}
                  noOptionsMessage={() => "Fetching managers..."}
                  defaultValue={managersList.filter(
                    (p) => p.id === branch.ManagerID
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
                    {"Create"}
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

export default AssignManagerForm;
