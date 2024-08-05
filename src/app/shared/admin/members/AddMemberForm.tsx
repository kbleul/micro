"use client";

import FormFooter from "@/components/form-footer";
import FormGroup from "@/components/form-group";
import FormikInput from "@/components/ui/form/input";
import CustomSelect from "@/components/ui/form/select";
import { routes } from "@/config/routes";
import { useGetHeaders } from "@/hooks/use-get-headers";
import useDynamicMutation from "@/react-query/usePostData";
import cn from "@/utils/class-names";
import {
  CITIES,
  genderOptions,
  MarriageStatusOptions,
  REGIONS,
} from "@/utils/dummy";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
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
import { Button } from "rizzui";

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
          Status: true,
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
                    description="Add basic member information here..."
                    className={cn(className)}
                  >
                    <FormikInput
                      name="first_name"
                      label="First Name"
                      placeholder="Enter first name"
                      color="primary"
                      className=""
                    />

                    <FormikInput
                      name="middle_name"
                      label="Middle Name"
                      placeholder="Enter middle name"
                      color="primary"
                      className=""
                    />

                    <FormikInput
                      name="last_name"
                      label="Last Name"
                      placeholder="Enter last name"
                      color="primary"
                      className=""
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

                    <FormikInput
                      name="phone_number"
                      label="Phone Number"
                      placeholder="9**********"
                      prefix="+251"
                      color="primary"
                      className="col-span-2 xl:col-span-1"
                    />

                    <Field name="birth_date">
                      {() => (
                        <div>
                          <DatePicker
                            inputProps={{ label: "Birth Date" }}
                            placeholderText="Select DOB"
                            selected={values.date_of_birth}
                            onChange={(date) =>
                              setFieldValue("birth_date", date)
                            }
                            showYearDropdown
                          />
                          <ErrorMessage
                            name={"birth_date"}
                            component="div"
                            className={
                              "text-xs capitalize text-red-500 pt-1 font-medium"
                            }
                          />
                        </div>
                      )}
                    </Field>
                  </FormGroup>

                  <FormGroup
                    title="Birth Place Location"
                    description="Add birth place location details here..."
                    className={cn(className)}
                  >
                    <div className="mt-4 w-full flex flex-col gap-6 ">
                      <CustomSelect
                        isSearchable
                        name="birth_region"
                        label="Region"
                        options={REGIONS}
                        onChange={(selectedOption: any) => {
                          setFieldValue("birth_region", selectedOption.name);
                        }}
                        placeholder="select birth region"
                        getOptionValue={(region: any) => region?.name}
                        getOptionLabel={(region: any) => region?.name}
                        noOptionsMessage={() => "Fetching regions..."}
                      />
                    </div>
                    <div className="mt-4 w-full flex flex-col gap-6 ">
                      <CustomSelect
                        isSearchable
                        name="birth_place"
                        label="City"
                        options={CITIES}
                        onChange={(selectedOption: any) => {
                          setFieldValue("birth_place", selectedOption.name);
                        }}
                        placeholder="select birth_place"
                        getOptionValue={(birth_place: any) => birth_place?.name}
                        getOptionLabel={(birth_place: any) => birth_place?.name}
                        noOptionsMessage={() => "Fetching cities..."}
                      />
                    </div>
                    <FormikInput
                      name="birth_zone"
                      label="Zone"
                      placeholder="Enter birth place zone"
                      color="primary"
                      className="col-span-2"
                    />

                    <FormikInput
                      name="birth_district"
                      label="District"
                      placeholder="Enter birth place district"
                      color="primary"
                      className="col-span-2"
                    />

                    <FormikInput
                      name="birth_subcity"
                      label="Birth Subcity"
                      placeholder="Enter birth subcity"
                      color="primary"
                      className=""
                    />

                    <FormikInput
                      name="birth_neighborhood"
                      label="Birth Neighborhood"
                      placeholder="Enter birth neighborhood"
                      color="primary"
                      className=""
                    />

                    <FormikInput
                      name="birth_zone"
                      label="Zone"
                      placeholder="Enter birth place zone"
                      color="primary"
                      className="col-span-2"
                    />

                    <FormikInput
                      name="birth_house_number"
                      label="Zone"
                      placeholder="Enter birth place house_number"
                      color="primary"
                      className="col-span-2"
                    />
                  </FormGroup>

                  <FormGroup
                    title="Current Location"
                    description="Add current location details here..."
                    className={cn(className)}
                  >
                    <div className="mt-4 w-full flex flex-col gap-6 ">
                      <CustomSelect
                        isSearchable
                        name="current_region"
                        label="Region"
                        options={REGIONS}
                        onChange={(selectedOption: any) => {
                          setFieldValue("current_region", selectedOption.name);
                        }}
                        placeholder="select current region"
                        getOptionValue={(region: any) => region?.name}
                        getOptionLabel={(region: any) => region?.name}
                        noOptionsMessage={() => "Fetching regions..."}
                      />
                    </div>
                    <div className="mt-4 w-full flex flex-col gap-6 ">
                      <CustomSelect
                        isSearchable
                        name="current_place"
                        label="City"
                        options={CITIES}
                        onChange={(selectedOption: any) => {
                          setFieldValue("current_place", selectedOption.name);
                        }}
                        placeholder="select current_place"
                        getOptionValue={(current_place: any) =>
                          current_place?.name
                        }
                        getOptionLabel={(current_place: any) =>
                          current_place?.name
                        }
                        noOptionsMessage={() => "Fetching cities..."}
                      />
                    </div>
                    <FormikInput
                      name="current_zone"
                      label="Zone"
                      placeholder="Enter current place zone"
                      color="primary"
                      className="col-span-2"
                    />

                    <FormikInput
                      name="current_district"
                      label="District"
                      placeholder="Enter current place district"
                      color="primary"
                      className="col-span-2"
                    />

                    <FormikInput
                      name="current_subcity"
                      label="Birth Subcity"
                      placeholder="Enter current subcity"
                      color="primary"
                      className=""
                    />

                    <FormikInput
                      name="current_neighborhood"
                      label="Birth Neighborhood"
                      placeholder="Enter current neighborhood"
                      color="primary"
                      className=""
                    />

                    <FormikInput
                      name="current_zone"
                      label="Zone"
                      placeholder="Enter current place zone"
                      color="primary"
                      className="col-span-2"
                    />

                    <FormikInput
                      name="current_house_number"
                      label="Zone"
                      placeholder="Enter current place house_number"
                      color="primary"
                      className="col-span-2"
                    />
                  </FormGroup>

                  <FormGroup
                    title="Marriage & Children info"
                    description="Add mariage and children details here..."
                    className={cn(className)}
                  >
                    <div className="mt-4 w-full flex flex-col gap-6 col-span-2">
                      <CustomSelect
                        isSearchable
                        name="MarriageStatus"
                        label="Marriage Status"
                        options={MarriageStatusOptions}
                        onChange={(selectedOption: string) => {
                          setFieldValue("MarriageStatus", selectedOption);
                        }}
                        placeholder="select marriage status type"
                        getOptionValue={(status: string) => status}
                        getOptionLabel={(status: string) => status}
                        noOptionsMessage={() => "Fetching status..."}
                      />
                    </div>

                    <FieldArray name={`product_variants.additionalInfo`}>
                      {(data: any) => (
                        <div className="grid grid-cols-2 gap-4 col-span-2">
                          <FormikInput
                            name="age"
                            label="Age"
                            placeholder="Enter age"
                            color="primary"
                            className=""
                            type="number"
                          />

                          <FormikInput
                            name="name"
                            label="Full Name"
                            placeholder="Enter full name"
                            color="primary"
                            className=""
                          />

                          <Button
                            onClick={() =>
                              data.push({
                                age: "",
                                name: "",
                              })
                            }
                            className="w-fit"
                          >
                            Add Children
                          </Button>
                        </div>
                      )}
                    </FieldArray>
                  </FormGroup>

                  <FormGroup
                    title="Emergency Contacts Info"
                    description="Add emergency contacts information here..."
                    className={cn(className)}
                  >
                    <FieldArray name={`product_variants.additionalInfo`}>
                      {(data: any) => (
                        <div>
                          <FormikInput
                            name="first_name"
                            label="First Name"
                            placeholder="Enter first name"
                            color="primary"
                            className=""
                          />

                          <FormikInput
                            name="last_name"
                            label="Last Name"
                            placeholder="Enter last name"
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
                            name="birth_zone"
                            label="Zone"
                            placeholder="Enter birth place zone"
                            color="primary"
                            className="col-span-2"
                          />

                          <FormikInput
                            name="birth_district"
                            label="District"
                            placeholder="Enter birth place district"
                            color="primary"
                            className="col-span-2"
                          />

                          <FormikInput
                            name="birth_subcity"
                            label="Birth Subcity"
                            placeholder="Enter birth subcity"
                            color="primary"
                            className=""
                          />

                          <FormikInput
                            name="birth_neighborhood"
                            label="Birth Neighborhood"
                            placeholder="Enter birth neighborhood"
                            color="primary"
                            className=""
                          />

                          <FormikInput
                            name="birth_zone"
                            label="Zone"
                            placeholder="Enter birth place zone"
                            color="primary"
                            className="col-span-2"
                          />

                          <FormikInput
                            name="birth_house_number"
                            label="Zone"
                            placeholder="Enter birth place house_number"
                            color="primary"
                            className="col-span-2"
                          />

                          <Button
                            onClick={() =>
                              data.push({
                                type: "",
                                valueEnglish: "",
                                valueAmharic: "",
                                colorNameEnglish: "",
                                colorNameAmharic: "",
                                hash: "",
                                product_image: undefined,
                                additionalInfo: [],
                              })
                            }
                          >
                            Add Contact
                          </Button>
                        </div>
                      )}
                    </FieldArray>
                  </FormGroup>

                  <FormGroup
                    title="Hairs Info"
                    description="Add hair information here..."
                    className={cn(className, "")}
                  >
                    <FieldArray name={`product_variants.additionalInfo`}>
                      {(data: any) => (
                        <div className="grid grid-cols-2 gap-4 border col-span-2">
                          <FormikInput
                            name="first_name"
                            label="First Name"
                            placeholder="Enter first name"
                            color="primary"
                            className=""
                          />

                          <FormikInput
                            name="last_name"
                            label="Last Name"
                            placeholder="Enter last name"
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
                            name="birth_zone"
                            label="Zone"
                            placeholder="Enter birth place zone"
                            color="primary"
                            className="col-span-2"
                          />

                          <FormikInput
                            name="birth_district"
                            label="District"
                            placeholder="Enter birth place district"
                            color="primary"
                            className="col-span-2"
                          />

                          <FormikInput
                            name="birth_subcity"
                            label="Birth Subcity"
                            placeholder="Enter birth subcity"
                            color="primary"
                            className=""
                          />

                          <FormikInput
                            name="birth_neighborhood"
                            label="Birth Neighborhood"
                            placeholder="Enter birth neighborhood"
                            color="primary"
                            className=""
                          />

                          <FormikInput
                            name="birth_zone"
                            label="Zone"
                            placeholder="Enter birth place zone"
                            color="primary"
                            className="col-span-2"
                          />

                          <FormikInput
                            name="birth_house_number"
                            label="House Number"
                            placeholder="Enter birth place house_number"
                            color="primary"
                            className="col-span-2"
                          />

                          <Button
                            onClick={() =>
                              data.push({
                                first_name: "",
                                last_name: "",
                                phone_number: "",
                                birth_zone: "",
                                birth_district: "",
                                birth_subcity: "",
                                birth_neighborhood: "",
                                birth_house_number: "",
                              })
                            }
                            className="w-fit"
                          >
                            Add Hair
                          </Button>
                        </div>
                      )}
                    </FieldArray>
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
