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
import Loading from "@/components/ui/Loading";
import { handleFetchState } from "@/utils/fetch-state-handler";

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
    [queryKeys.getAllBranches, branchId],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}branches/${branchId}`,
    headers,
    !!branchId
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

  const Branch: {
    name: string;
    phone_number: string;
    email: string;
    city: string;
    region: string;
    address: string;
  } = branchData?.data?.data;

  const initialValues: BranchType = {
    name: branchId ? Branch.name : "",
    phone_number: branchId ? Branch.phone_number : "",
    email: branchId ? Branch.email : "",
    city: branchId ? Branch.city : "",
    region: branchId ? Branch.region : "",
    address: branchId ? Branch.address : "",
  };

  const createBranchMangerSubmitHandler = async (values: BranchType) => {
    const newValues = {
      ...values,
    };
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}branches`,
        method: "POST",
        headers,
        body: {
          ...newValues,
          phone_number: "0" + newValues.phone_number,
          status: true,
        },
        onSuccess: (res) => {
          toast.success("Branch Created Successfully");

          router.push(routes.home.branches.view_all);
        },
        onError: (err) => {
          toast.error(err?.response?.data?.data);
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
                    />
                    <FormikInput
                      name="phone_number"
                      label="Phone Number"
                      placeholder="9**********"
                      prefix="+251"
                      color="primary"
                      className="col-span-2 xl:col-span-1"
                    />
                    <FormikInput
                      name="email"
                      label="Email"
                      placeholder="example@gmail.com"
                      color="primary"
                      className="col-span-2 xl:col-span-1"
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
                          CITIES.find((city) => city.name === Branch.city)
                        }
                        onChange={(selectedOption: any) => {
                          setFieldValue("city", selectedOption.name);
                        }}
                        placeholder="select city"
                        getOptionValue={(city: any) => city?.name}
                        getOptionLabel={(city: any) => city?.name}
                        noOptionsMessage={() => "Fetching cities..."}
                      />
                    </div>
                    <FormikInput
                      name="address"
                      label="Specific Address"
                      placeholder="Eg. Bole Medhanialem in front of Edna Mall"
                      color="primary"
                      className="col-span-2"
                    />
                  </FormGroup>
                </div>

                <div className="mt-6">
                  <FormFooter
                    submitBtnText={branchId ? "Update" : "Save"}
                    showSveBtn={false}
                    isLoading={postMutation.isPending}
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </main>
    </article>
  );
};

export default AddBranchForm;
