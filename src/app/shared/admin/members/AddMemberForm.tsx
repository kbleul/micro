"use client";

import FormFooter from "@/components/form-footer";
import FormGroup from "@/components/form-group";
import FormikInput from "@/components/ui/form/input";
import CustomSelect from "@/components/ui/form/select";
import { routes } from "@/config/routes";
import { useGetHeaders } from "@/hooks/use-get-headers";
import useDynamicMutation from "@/react-query/usePostData";
import cn from "@/utils/class-names";
import { genderOptions } from "@/utils/dummy";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import PageHeader from "../../page-header";
import { useSession } from "next-auth/react";
import { DatePicker } from "@/components/ui/datepicker";
import dynamic from "next/dynamic";
import SelectLoader from "@/components/loader/select-loader";
import { EmployeeSchema, EmployeeType } from "@/validations/employee.schema";
import FormikPasswordInput from "@/components/ui/form/password-input";

const Select = dynamic(() => import("@/components/ui/select"), {
  ssr: false,
  loading: () => <SelectLoader />,
});

const AddMemberForm = ({
  memberId,
  className,
}: {
  memberId?: string;
  className?: string;
}) => {
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "Json" });
  const router = useRouter();
  const { data: session } = useSession();

  const pageHeader = {
    title: memberId ? "View Member" : "Add New Member",
    breadcrumb: [
      {
        href: routes.home.dashboard,
        name: "Home",
      },
      {
        href: routes.home.members.view_all,
        name: "Members",
      },
      {
        name: memberId ? "View / Edit Member" : "Add Member",
      },
    ],
  };




  const initialValues: EmployeeType = {
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    tin_number: "",
    role: "",
    date_of_birth: undefined,
    gender: "",
    password: "",
  };

  const createEmployeeSubmitHandler = async (values: EmployeeType) => {
    if (
      !session?.user?.permissions.includes("create:manager") &&
      values.role === "manager"
    ) {
      toast.error("You dont have permission to create a manager");
      return;
    }

    const roles: any[] = [];

    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}users`,
        method: "POST",
        headers,
        body: {
          ...values,
          phone_number: "+251" + values.phone_number,
          role: roles.find((role) => role.slug === values.role).id,
          Status: true
        },
        onSuccess: (res) => {
          toast.success("Member Created Successfully");

          router.push(routes.home.employees.view_all);
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
          validationSchema={EmployeeSchema}
          onSubmit={(values) => createEmployeeSubmitHandler(values)}
        >
          {({ values, setFieldValue, errors }) => {
            return (
              <Form className={"[&_label.block>span]:font-medium "}>
                <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                  <FormGroup
                    title="Member Info."
                    description="Add employee information from here..."
                    className={cn(className)}
                  >
                    <FormikInput
                      name="first_name"
                      label="First Name"
                      placeholder="Enter branch name"
                      color="primary"
                      className=""
                    />
                    <FormikInput
                      name="last_name"
                      label="Last Name"
                      placeholder="Enter branch name"
                      color="primary"
                      className=""
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

                    <Field name="gender">
                      {() => (
                        <Select
                          options={genderOptions}
                          value={values.gender}
                          onChange={(value) => setFieldValue("gender", value)}
                          label="Gender"
                          error={errors?.gender}
                          getOptionValue={(option) => option.name}
                          color="primary"
                          placeholder="Selectfor this branch yet gender"
                        />
                      )}
                    </Field>

                    <Field name="date_of_birth">
                      {() => (
                        <div>
                          <DatePicker
                            inputProps={{ label: "Birth Date" }}
                            placeholderText="Select DOB"
                            selected={values.date_of_birth}
                            onChange={(date) =>
                              setFieldValue("date_of_birth", date)
                            }
                            showYearDropdown
                          />
                          <ErrorMessage
                            name={"date_of_birth"}
                            component="div"
                            className={
                              "text-xs capitalize text-red-500 pt-1 font-medium"
                            }
                          />
                        </div>
                      )}
                    </Field>
                    <FormikInput
                      name="tin_number"
                      label="Tin number(optional)"
                      placeholder=""
                      color="primary"
                      className=""
                    />
                  </FormGroup>
                  <FormGroup
                    title="More Info."
                    description="Add more details here..."
                    className={cn(className)}
                  >
                    <div className="mt-4 w-full flex flex-col gap-6 col-span-1">
                      <CustomSelect
                        isSearchable
                        name="role"
                        label="Roles"
                        options={[]}
                        onChange={(selectedOption: any) => {
                          if (
                            !session?.user?.permissions.includes(
                              "create:manager"
                            ) &&
                            selectedOption.slug === "manager"
                          ) {
                            toast.error(
                              "You dont have permission to create a manager"
                            );
                          }
                          setFieldValue("role", selectedOption.slug);
                        }}
                        placeholder="select role"
                        getOptionValue={(role: any) => role?.slug}
                        getOptionLabel={(role: any) => role?.name}
                        noOptionsMessage={() => "Fetching roles..."}
                      />
                    </div>

                    <FormikPasswordInput
                      label="Password"
                      placeholder="Enter temporary password"
                      color="primary"
                      name="password"
                      className="col-span-1"
                    />
                  </FormGroup>
                </div>

                {session?.user?.permissions &&
                  session?.user?.permissions.includes("create:employee") &&
                  !memberId && (
                    <div className="mt-6">
                      <FormFooter
                        submitBtnText="Add Employee"
                        showSveBtn={false}
                        isLoading={postMutation.isPending}
                      />
                    </div>
                  )}

                {session?.user?.permissions &&
                  session?.user?.permissions.includes("update:employee") &&
                  memberId && (
                    <div className="mt-6">
                      <FormFooter
                        submitBtnText="Update Employee"
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

export default AddMemberForm;
