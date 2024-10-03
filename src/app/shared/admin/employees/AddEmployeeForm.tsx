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
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { handleFetchState } from "@/utils/fetch-state-handler";
import { DatePicker } from "@/components/ui/datepicker";
import dynamic from "next/dynamic";
import SelectLoader from "@/components/loader/select-loader";
import { EmployeeSchema, EmployeeType } from "@/validations/employee.schema";
import appendAsterisk from "@/components/ui/form/asterrisk";
import { handleErrorWithToast } from "@/utils/error-toast-handler";
import { secondaryDateFormat } from "@/utils/format-date";
import { validateDate } from "@/utils/date_checker";

const Select = dynamic(() => import("@/components/ui/select"), {
  ssr: false,
  loading: () => <SelectLoader />,
});

const AddEmployeeForm = ({
  employeeId,
  className,
}: {
  employeeId?: string;
  className?: string;
}) => {
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "Json" });
  const router = useRouter();

  const { data: session } = useSession();

  const pageHeader = {
    title: employeeId ? "View Employee" : "Add New Employee",
    breadcrumb: [
      {
        href: routes.home.dashboard,
        name: "Home",
      },
      {
        href: routes.home.employees.view_all,
        name: "Employees",
      },
      {
        name: employeeId ? "View / Edit Employee" : "Add Employee",
      },
    ],
  };

  const branchesData = useFetchData(
    [queryKeys.getAllBranches],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}branches`,
    headers
  );

  const fetchStateHandlerBranch = handleFetchState(
    branchesData,
    <PageHeader
      title={pageHeader.title ?? ""}
      breadcrumb={pageHeader.breadcrumb}
    />
  );

  const rolesData = useFetchData(
    [queryKeys.getAllRoles, employeeId],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}user-roles`,
    headers
  );

  const employeehData = useFetchData(
    [queryKeys.getAllEmployees, employeeId],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}users/${employeeId}`,
    headers,
    !!employeeId
  );

  const fetchStateHandler = handleFetchState(
    employeehData,
    <PageHeader
      title={pageHeader.title ?? ""}
      breadcrumb={pageHeader.breadcrumb}
    />
  );

  if (fetchStateHandler && employeeId) {
    return fetchStateHandler;
  }

  const fetchStateHandlerRoles = handleFetchState(
    rolesData,
    <PageHeader
      title={pageHeader.title ?? ""}
      breadcrumb={pageHeader.breadcrumb}
    />
  );

  if (fetchStateHandlerRoles || fetchStateHandlerBranch) {
    return fetchStateHandler;
  }

  const Branches = branchesData?.data?.data?.branches ?? [];

  const initialValues: EmployeeType = {
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    tin_number: "",
    role: "",
    date_of_birth: undefined,
    gender: "",
    branch_name: null,
  };

  const createEmployeeSubmitHandler = async (values: EmployeeType) => {
    if (
      !session?.user?.permissions.includes("create:manager") &&
      values.role === "manager"
    ) {
      toast.error("You dont have permission to create a manager");
      return;
    }

    const isValidDate = validateDate(secondaryDateFormat(values.date_of_birth));
    if (!isValidDate.isAbove18 || isValidDate.isFuture) {
      toast.error(
        "Invalid Date of Birth. Date must be a valide date and above 18 years old"
      );
      return;
    }

    const roles: any[] = rolesData.data.data;

    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}users`,
        method: "POST",
        headers,
        body: {
          ...values,
          phone_number: "+251" + values.phone_number,
          role_id: roles.find((role) => role.slug === values.role).id,
          date_of_birth: secondaryDateFormat(values.date_of_birth),
          Status: true,
        },
        onSuccess: (res) => {
          toast.success("Employee Created Successfully");

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
                    title="Employee Info."
                    description="Add employee information here..."
                    className={cn(className)}
                  >
                    <FormikInput
                      name="first_name"
                      label="First Name"
                      placeholder="Enter first name"
                      color="primary"
                      className=""
                      isRequired
                    />
                    <FormikInput
                      name="last_name"
                      label="Last Name"
                      placeholder="Enter last name"
                      color="primary"
                      className=""
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
                          placeholder="Select gender"
                          isRequired
                        />
                      )}
                    </Field>

                    <Field name="date_of_birth">
                      {() => (
                        <div>
                          <DatePicker
                            inputProps={{
                              label: appendAsterisk("Birth Date", true),
                            }}
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

                    <CustomSelect
                      isSearchable
                      name="branch_name"
                      label="Branch Name"
                      options={Branches}
                      onChange={(selectedOption: any) => {
                        setFieldValue("branch_name", selectedOption.id);
                      }}
                      placeholder="select role"
                      getOptionValue={(branch: any) => branch?.id}
                      getOptionLabel={(branch: any) => branch?.name}
                      noOptionsMessage={() => "Fetching branches..."}
                      isRequired
                      labelClassName="mb-0 py-0"
                    />
                  </FormGroup>
                  <FormGroup
                    title="More Info."
                    description="Add more details here..."
                    className={cn(className)}
                  >
                    <div className="mt-4 w-full flex flex-col gap-6 col-span-2">
                      <CustomSelect
                        isSearchable
                        name="role"
                        label="Roles"
                        options={rolesData.data.data}
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
                        isRequired
                      />
                    </div>
                  </FormGroup>
                </div>

                {session?.user?.permissions &&
                  session?.user?.permissions.includes("create:employee") &&
                  !employeeId && (
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
                  employeeId && (
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

export default AddEmployeeForm;
