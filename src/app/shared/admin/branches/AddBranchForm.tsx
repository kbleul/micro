"use client";

import FormFooter from "@/components/form-footer";
import FormGroup from "@/components/form-group";
import FormikInput from "@/components/ui/form/input";
import CustomSelect from "@/components/ui/form/select";
import { routes } from "@/config/routes";
import { useGetHeaders } from "@/hooks/use-get-headers";
import useDynamicMutation from "@/react-query/usePostData";
import cn from "@/utils/class-names";
import { CITIES, REGIONS } from "@/utils/dummy";
import { BranchSchema, BranchType } from "@/validations/branch.schema";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import PageHeader from "../../page-header";
import { useSession } from "next-auth/react";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { handleFetchState } from "@/utils/fetch-state-handler";
import { Button } from "rizzui";
import { useModal } from "../../modal-views/use-modal";
import AssignManagerForm from "./AssignManagerForm";
import { branchType } from "types/common_types";
import { handleErrorWithToast } from "@/utils/error-toast-handler";
import { parsePhoneNumber } from "@/utils/parse-phone";

const AddBranchForm = ({
  branchId,
  className,
}: {
  branchId?: string;
  className?: string;
}) => {
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "Json" });
  const router = useRouter();
  const { data: session } = useSession();
  const { openModal } = useModal();

  const pageHeader = {
    title: branchId ? "View Branch" : "Add New Branch",
    breadcrumb: [
      {
        href: routes.home.dashboard,
        name: "Home",
      },
      {
        href: routes.home.branches.view_all,
        name: "Branches",
      },
      {
        name: branchId ? "View / Edit Branch" : "Add Branch",
      },
    ],
  };

  const branchData = useFetchData(
    branchId
      ? [queryKeys.getAllBranches + branchId, branchId]
      : [queryKeys.getAllBranches, branchId],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}branches/${branchId}`,
    headers
  );

  const fetchStateHandler = handleFetchState(
    branchData,
    <PageHeader
      title={pageHeader.title ?? ""}
      breadcrumb={pageHeader.breadcrumb}
    />
  );

  if (fetchStateHandler && branchId) {
    return fetchStateHandler;
  }

  const Branch: branchType = branchData?.data?.data?.branch ?? null;

  const initialValues: BranchType = {
    name: branchId ? Branch?.name : "",
    phone_number: branchId ? parsePhoneNumber(Branch?.phone_number)  : "",
    email: branchId ? Branch?.email : "",
    city: branchId ? Branch?.city : "",
    region: branchId ? Branch?.region : "",
    address: branchId ? Branch?.address : "",
  };

  const createBranchMangerSubmitHandler = async (values: BranchType) => {
    const newValues = {
      ...values,
    };
    try {
      await postMutation.mutateAsync({
        url: branchId
          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}branches/${branchId}`
          : `${process.env.NEXT_PUBLIC_BACKEND_URL}branches`,
        method: branchId ? "PUT" : "POST",
        headers,
        body: {
          ...newValues,
          phone_number: "251" + newValues.phone_number,
          status: true,
        },
        onSuccess: (res) => {
          toast.success(branchId ? "Branch updated Successfully" : "Branch Created Successfully");

          router.push(routes.home.branches.view_all);
        },
        onError: (err) => {
          handleErrorWithToast(err, toast);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <article>
      <PageHeader
        title={pageHeader.title ?? ""}
        breadcrumb={pageHeader.breadcrumb}
      />
      {/* <div className="flex justify-end">
                <div className="self-end flex justify-end gap-x-6 border rounded-xl w-fit items-center pl-6 font-medium text-primary-dark">
                <p>
                      Branch Manager -
                      <span className="ml-3 underline font-medium">
                        {Branch.name}
                      </span>{" "}
                    </p>

                  <Button
                    size="lg"
                    color="primary"
                    className="text-white bg-primary-dark"
                    onClick={() =>
                      openModal({
                        view: <AssignManagerForm branch={Branch} />,
                      })
                    }
                  >
                    Change Manager
                  </Button>
                </div>
              </div> */}
      {branchId &&
        Branch &&
        session?.user?.permissions.includes("update:branch") && (
          <section>
            {branchData?.data?.data?.manager ? (
              <div className="flex justify-end">
                <div className="self-end flex justify-end gap-x-6 border rounded-xl w-fit items-center pl-6 font-medium text-primary-dark">
                  <p>
                    Branch Manager -
                    <span className="ml-3 underline font-medium">
                      {branchData?.data?.data?.manager?.full_name}
                    </span>{" "}
                  </p>

                  <Button
                    size="lg"
                    color="primary"
                    className="text-white bg-primary-dark"
                    onClick={() =>
                      openModal({
                        view: <AssignManagerForm branch={Branch} />,
                      })
                    }
                  >
                    Change Manager
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-end">
                <div className="self-end flex justify-end gap-x-6 border rounded-xl w-fit items-center pl-6 font-medium text-primary-dark">
                  <p>Manager is not added for this branch yet</p>
                  <Button
                    size="lg"
                    color="primary"
                    className="text-white bg-primary-dark"
                    onClick={() =>
                      openModal({
                        view: <AssignManagerForm branch={Branch} />,
                      })
                    }
                  >
                    Add Manager
                  </Button>
                </div>
              </div>
            )}
          </section>
        )}

      <main className="@container">
        <Formik
          initialValues={initialValues}
          validationSchema={BranchSchema}
          onSubmit={(values) => createBranchMangerSubmitHandler(values)}
        >
          {({ setFieldValue }) => {
            return (
              <Form className={"[&_label.block>span]:font-medium "}>
                <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                  <FormGroup
                    title="Branch Info."
                    description="Add branch information from here..."
                    className={cn(className)}
                  >
                    <FormikInput
                      name="name"
                      label="Branch Name"
                      placeholder="Enter branch name"
                      color="primary"
                      className="col-span-2"
                      isRequired
                    />
                    <FormikInput
                      name="phone_number"
                      label="Phone Number"
                      placeholder="9**********"
                      prefix="+251"
                      color="primary"
                      className="col-span-2 xl:col-span-1"
                      isRequired
                    />
                    <FormikInput
                      name="email"
                      label="Email"
                      placeholder="example@gmail.com"
                      color="primary"
                      className="col-span-2 xl:col-span-1"
                      isRequired
                    />
                  </FormGroup>
                  <FormGroup
                    title="Branch Location"
                    description="Add branch location info here..."
                    className={cn(className)}
                  >
                    <div className="mt-4 w-full flex flex-col gap-6 ">
                      <CustomSelect
                        isSearchable
                        name="region"
                        label="Region"
                        options={REGIONS}
                        defaultValue={
                          branchId &&
                          Branch &&
                          REGIONS.find(
                            (region) => region.name === Branch.region
                          )
                        }
                        onChange={(selectedOption: any) => {
                          setFieldValue("region", selectedOption.name);
                        }}
                        placeholder="select region"
                        getOptionValue={(region: any) => region?.name}
                        getOptionLabel={(region: any) => region?.name}
                        noOptionsMessage={() => "Fetching regions..."}
                        isRequired
                      />
                    </div>
                    <div className="mt-4 w-full flex flex-col gap-6 ">
                      <CustomSelect
                        isSearchable
                        name="city"
                        label="City"
                        options={CITIES}
                        defaultValue={
                          branchId &&
                          Branch &&
                          CITIES.find((city) => city.name === Branch.city)
                        }
                        onChange={(selectedOption: any) => {
                          setFieldValue("city", selectedOption.name);
                        }}
                        placeholder="select city"
                        getOptionValue={(city: any) => city?.name}
                        getOptionLabel={(city: any) => city?.name}
                        noOptionsMessage={() => "Fetching cities..."}
                        isRequired
                      />
                    </div>
                    <FormikInput
                      name="address"
                      label="Specific Address"
                      placeholder="Eg. Bole Medhanialem in front of Edna Mall"
                      color="primary"
                      className="col-span-2"
                      isRequired
                    />
                  </FormGroup>
                </div>

                {session?.user?.permissions &&
                  session?.user?.permissions.includes("create:branch") &&
                  !branchId && (
                    <div className="mt-6">
                      <FormFooter
                        submitBtnText="Add Branch"
                        showSveBtn={false}
                        isLoading={postMutation.isPending}
                      />
                    </div>
                  )}

                {session?.user?.permissions &&
                  session?.user?.permissions.includes("update:branch") &&
                  branchId && (
                    <div className="mt-6">
                      <FormFooter
                        submitBtnText="Update Branch"
                        showSveBtn={false}
                        isLoading={postMutation.isPending}
                      />
                    </div>
                  )}
              </Form>
            );
          }}
        </Formik>
      </main>
    </article>
  );
};

export default AddBranchForm;
