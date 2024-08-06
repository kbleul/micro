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
  IdentificationTypeOptions,
  MarriageStatusOptions,
  periodOptions,
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
import { Button } from "rizzui";
import { MemberSchema, MemberType } from "@/validations/member.schema";
import { secondaryDateFormat } from "@/utils/format-date";
import AvaterPicker from "@/components/ui/form/avater-upload";
import { handleErrorWithToast } from "@/utils/error-toast-handler";
import { useFetchData } from "@/react-query/useFetchData";
import { handleFetchState } from "@/utils/fetch-state-handler";
import { queryKeys } from "@/react-query/query-keys";

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
  const headers = useGetHeaders({ type: "FormData" });
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

  const accountTypesData = useFetchData(
    [queryKeys.getAccountTypes],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}account-types`,
    headers
  );

  const fetchStateHandler = handleFetchState(
    accountTypesData,
    <PageHeader
      title={pageHeader.title ?? ""}
      breadcrumb={pageHeader.breadcrumb}
    />
  );

  if (fetchStateHandler) {
    return fetchStateHandler;
  }
  const Types: any[] = accountTypesData?.data?.data?.accountTypes ?? null;

  const initialValues: MemberType = {
    first_name: "",
    last_name: "",
    phone_number: "",
    middle_name: "",
    birth_date: undefined,
    gender: "",
    age: 18,

    birth_place: "",
    birth_district: "",
    birth_neighborhood: "",
    birth_zone: "",
    birth_subcity: "",
    birth_region: "",
    birth_house_number: "",

    current_region: "",
    current_district: "",
    current_neighborhood: "",
    current_zone: "",
    current_subcity: "",
    current_house_number: "",

    marriage_status: "",
    spouse_name: "",

    registration_fee: 0,

    photo: undefined,
    id_photo: undefined,

    method_of_identifcation: "",
    identification_number: "",

    children: [
      {
        name: "",
        age: 0,
        gender: "",
      },
    ],
    heirs: [
      {
        address: "",
        city: "",
        first_name: "",
        last_name: "",
        house_number: "",
        occupation: "",
        phone_number: "",
        relationship: "",
        subcity: "",
        woreda: "",
        zone: "",
        kebele: "",
      },
    ],
    emergency_contacts: [
      {
        address: "",
        city: "",
        first_name: "",
        last_name: "",
        house_number: "",
        occupation: "",
        phone_number: "",
        relationship: "",
        subcity: "",
        woreda: "",
        zone: "",
        kebele: "",
      },
    ],

    initial_balance: 0,
    account_type_id: "",
    term_grace_period: 0,
    term_amount: 0,
  };

  const createEmployeeSubmitHandler = async (values: MemberType) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}members`,
        method: "POST",
        headers,
        body: {
          ...values,
          phone_number: "+251" + values.phone_number,
          gender: values.gender.toLowerCase(),
          birth_date: secondaryDateFormat(values.birth_date),
          Status: true,
          firstname: values.first_name,
          lastname: values.last_name,
          middlename: values.middle_name,
          birthdate: secondaryDateFormat(values.birth_date),
          currentregion: values.current_region,
          number_of_children_boys: values.children.filter(
            (child) => child.gender === "Male"
          ).length,
          number_of_children_girls: values.children.filter(
            (child) => child.gender === "Female"
          ).length,
        },
        onSuccess: (res) => {
          toast.success("Member Created Successfully");

          router.push(routes.home.members.view_all);
        },
        onError: (err) => {
          console.log("--------->",err)
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
          validationSchema={MemberSchema}
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
                      isRequired
                    />

                    <FormikInput
                      name="middle_name"
                      label="Middle Name"
                      placeholder="Enter middle name"
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
                      name="age"
                      label="Age"
                      placeholder="Enter age"
                      color="primary"
                      className=""
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

                    <FormikInput
                      name="phone_number"
                      label="Phone Number"
                      placeholder="9**********"
                      prefix="+251"
                      color="primary"
                      className="col-span-2 xl:col-span-1"
                      isRequired
                    />

                    <Field name="birth_date">
                      {() => (
                        <div>
                          <DatePicker
                            inputProps={{ label: "Birth Date" }}
                            placeholderText="Select DOB"
                            selected={values.birth_date}
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
                    title="Marriage & Children info"
                    description="Add mariage and children details here..."
                    className={cn(className)}
                  >
                    <div className="mt-4 w-full flex flex-col gap-6 col-span-2">
                      <CustomSelect
                        name="marriage_status"
                        label="Marriage Status"
                        options={MarriageStatusOptions}
                        onChange={(selectedOption: { value: string }) => {
                          console.log(errors)
                          setFieldValue(
                            "marriage_status",
                            selectedOption.value
                          );
                        }}
                        placeholder="select marriage status type"
                        getOptionValue={(status: { value: string }) =>
                          status.value
                        }
                        getOptionLabel={(status: { name: string }) =>
                          status.name
                        }
                        noOptionsMessage={() => "Fetching status..."}
                        isRequired
                      />
                    </div>

                    {values.marriage_status === "married" && (
                      <FormikInput
                        name="spouse_name"
                        label="Spouse Name"
                        placeholder="Enter full name"
                        color="primary"
                        className="col-span-2"
                      />
                    )}

                    <FieldArray name="children">
                      {(data: any) => (
                        <div className=" col-span-2 shadow-lg rounded-lg p-6 border-t">
                          <p className="font-semibold underline text-lg">
                            Add children information
                          </p>
                          {values.children?.map((_: any, index: number) => (
                            <div className="grid grid-cols-2 gap-4 transition-opacity  duration-300 ease-in-out transform my- 4 pt-4 pb-8 border-b border-broken">
                              <FormikInput
                                name={`children.${index}.name`}
                                label="Name"
                                placeholder="Enter full name"
                                color="primary"
                                className="col-span-2"
                              />

                              <FormikInput
                                name={`children.${index}.age`}
                                label="Age"
                                placeholder="Enter age"
                                color="primary"
                                className=""
                                type="number"
                              />

                              <Field name={`children.${index}.gender`}>
                                {() => (
                                  <Select
                                    options={genderOptions}
                                    value={values.children[index].gender}
                                    onChange={(value) =>
                                      setFieldValue(
                                        `children.${index}.gender`,
                                        value
                                      )
                                    }
                                    label="Gender"
                                    getOptionValue={(option) => option.value}
                                    color="primary"
                                    placeholder="Select gender"
                                  />
                                )}
                              </Field>
                            </div>
                          ))}

                          <div className="flex justify-between mt-6">
                            <Button
                              onClick={() => {
                                data.push({
                                  age: "",
                                  name: "",
                                  gender: "",
                                });
                              }}
                              className="w-fit bg-primary text-white font-semibold"
                            >
                              Add Children
                            </Button>
                            {values.children.length > 1 && (
                              <Button
                                onClick={() => {
                                  data.pop();
                                }}
                                className="w-fit bg-red-400 text-white font-semibold"
                              >
                                Remove Children
                              </Button>
                            )}
                          </div>
                        </div>
                      )}
                    </FieldArray>
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
                        placeholder="select birth place"
                        getOptionValue={(birth_place: any) => birth_place?.name}
                        getOptionLabel={(birth_place: any) => birth_place?.name}
                        noOptionsMessage={() => "Fetching cities..."}
                      />
                    </div>

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
                      className=""
                    />

                    <FormikInput
                      name="birth_house_number"
                      label="House Number"
                      placeholder="Enter birth place house_number"
                      color="primary"
                      className=""
                      isRequired
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
                        isRequired
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
                      className=""
                    />

                    <FormikInput
                      name="current_house_number"
                      label="House Number"
                      placeholder="Enter current place house_number"
                      color="primary"
                      className=""
                      isRequired
                    />
                  </FormGroup>

                  <FormGroup
                    title="Emergency Contacts Info"
                    description="Add emergency contacts information here..."
                    className={cn(className)}
                  >
                    <FieldArray name={`emergency_contacts`}>
                      {(data: any) => (
                        <div className="col-span-2 shadow-lg rounded-lg p-6 border-t">
                          <p className="font-semibold underline text-lg">
                            Add contacts information
                          </p>
                          {values.emergency_contacts?.map(
                            (_: any, index: number) => (
                              <div className="grid grid-cols-2 gap-4 my- 4 pt-4 pb-8 border-b border-broken">
                                <FormikInput
                                  name={`emergency_contacts.[${index}].first_name`}
                                  label="First Name"
                                  placeholder="Enter first name"
                                  color="primary"
                                  className=""
                                />
                                <FormikInput
                                  name={`emergency_contacts.[${index}].last_name`}
                                  label="Last Name"
                                  placeholder="Enter last name"
                                  color="primary"
                                  className=""
                                />
                                <FormikInput
                                  name={`emergency_contacts.[${index}].phone_number`}
                                  label="Phone Number"
                                  placeholder="9**********"
                                  prefix="+251"
                                  color="primary"
                                  className="col-span-2 xl:col-span-1"
                                />

                                <div className="mt-4 w-full flex flex-col gap-6 ">
                                  <CustomSelect
                                    isSearchable
                                    name={`emergency_contacts.[${index}].city`}
                                    label="City"
                                    options={CITIES}
                                    onChange={(selectedOption: any) => {
                                      setFieldValue(
                                        `emergency_contacts.[${index}].city`,
                                        selectedOption.name
                                      );
                                    }}
                                    placeholder="select city"
                                    getOptionValue={(city: any) => city?.name}
                                    getOptionLabel={(city: any) => city?.name}
                                    noOptionsMessage={() =>
                                      "Fetching cities..."
                                    }
                                  />
                                </div>

                                <FormikInput
                                  name={`emergency_contacts.[${index}].zone`}
                                  label="Zone"
                                  placeholder="Enter place zone"
                                  color="primary"
                                  className="col-span-2"
                                />

                                <FormikInput
                                  name={`emergency_contacts.[${index}].subcity`}
                                  label="Birth Subcity"
                                  placeholder="Enter subcity"
                                  color="primary"
                                  className=""
                                />

                                <FormikInput
                                  name={`emergency_contacts.[${index}].woreda`}
                                  label="Woreda"
                                  placeholder="Enter woreda"
                                  color="primary"
                                  className=""
                                />
                                <FormikInput
                                  name={`emergency_contacts.[${index}].house_number`}
                                  label="House Number"
                                  placeholder="Enter house number"
                                  color="primary"
                                  className=""
                                  isRequired
                                />
                                <FormikInput
                                  name={`emergency_contacts.[${index}].address`}
                                  label="Specific Address"
                                  placeholder="Enter specific address"
                                  color="primary"
                                  className="col-span-2"
                                />
                              </div>
                            )
                          )}

                          <div className="flex justify-between mt-6">
                            <Button
                              onClick={() => {
                                data.push({
                                  address: "",
                                  city: "",
                                  first_name: "",
                                  last_name: "",
                                  house_number: "",
                                  occupation: "",
                                  phone_number: "",
                                  relationship: "",
                                  subcity: "",
                                  woreda: "",
                                  zone: "",
                                  kebele: "",
                                });
                              }}
                              className="w-fit bg-primary text-white font-semibold"
                            >
                              Add Contact
                            </Button>
                            {values.emergency_contacts.length > 1 && (
                              <Button
                                onClick={() => {
                                  data.pop();
                                }}
                                className="w-fit bg-red-400 text-white font-semibold"
                              >
                                Remove Contact
                              </Button>
                            )}
                          </div>
                        </div>
                      )}
                    </FieldArray>
                  </FormGroup>

                  <FormGroup
                    title="Heir Info"
                    description="Add hair information here..."
                    className={cn(className, "")}
                  >
                    <FieldArray name={`heirs`}>
                      {(data: any) => (
                        <div className="col-span-2 shadow-lg rounded-lg p-6 border-t">
                          {values.heirs?.map((_: any, index: number) => (
                            <div className="grid grid-cols-2 gap-4 my- 4 pt-4 pb-8 border-b border-broken">
                              <FormikInput
                                name={`heirs.[${index}].first_name`}
                                label="First Name"
                                placeholder="Enter first name"
                                color="primary"
                                className=""
                              />
                              <FormikInput
                                name={`heirs.[${index}].last_name`}
                                label="Last Name"
                                placeholder="Enter last name"
                                color="primary"
                                className=""
                              />
                              <FormikInput
                                name={`heirs.[${index}].phone_number`}
                                label="Phone Number"
                                placeholder="9**********"
                                prefix="+251"
                                color="primary"
                                className="col-span-2 xl:col-span-1"
                              />

                              <div className="mt-4 w-full flex flex-col gap-6 ">
                                <CustomSelect
                                  isSearchable
                                  name={`heirs.[${index}].city`}
                                  label="City"
                                  options={CITIES}
                                  onChange={(selectedOption: any) => {
                                    setFieldValue(
                                      `heirs.[${index}].city`,
                                      selectedOption.name
                                    );
                                  }}
                                  placeholder="select city"
                                  getOptionValue={(city: any) => city?.name}
                                  getOptionLabel={(city: any) => city?.name}
                                  noOptionsMessage={() => "Fetching cities..."}
                                />
                              </div>

                              <FormikInput
                                name={`heirs.[${index}].zone`}
                                label="Zone"
                                placeholder="Enter place zone"
                                color="primary"
                                className=""
                              />

                              <FormikInput
                                name={`heirs.[${index}].subcity`}
                                label="Subcity"
                                placeholder="Enter subcity"
                                color="primary"
                                className=""
                              />

                              <FormikInput
                                name={`heirs.[${index}].woreda`}
                                label="Woreda"
                                placeholder="Enter woreda"
                                color="primary"
                                className=""
                              />
                              <FormikInput
                                name={`heirs.[${index}].house_number`}
                                label="House Number"
                                placeholder="Enter house number"
                                color="primary"
                                className=""
                                isRequired
                              />
                              <FormikInput
                                name={`heirs.[${index}].address`}
                                label="Specific Address"
                                placeholder="Enter specific address"
                                color="primary"
                                className="col-span-2"
                              />
                            </div>
                          ))}

                          <div className="flex justify-between mt-6">
                            <Button
                              onClick={() => {
                                data.push({
                                  address: "",
                                  city: "",
                                  first_name: "",
                                  last_name: "",
                                  house_number: "",
                                  occupation: "",
                                  phone_number: "",
                                  relationship: "",
                                  subcity: "",
                                  woreda: "",
                                  zone: "",
                                  kebele: "",
                                });
                              }}
                              className="w-fit bg-primary text-white font-semibold"
                            >
                              Add Heir
                            </Button>
                            {values.heirs.length > 1 && (
                              <Button
                                onClick={() => {
                                  data.pop();
                                }}
                                className="w-fit bg-red-400 text-white font-semibold"
                              >
                                Remove Heir
                              </Button>
                            )}
                          </div>
                        </div>
                      )}
                    </FieldArray>
                  </FormGroup>

                  <FormGroup
                    title="Id & Images"
                    description="Add id type and images here..."
                    className={cn(className, "")}
                  >
                    <div className="mt-4 w-full flex flex-col gap-6 col-span-2">
                      <CustomSelect
                        name="method_of_identifcation"
                        label="Identifcation Type"
                        options={IdentificationTypeOptions}
                        onChange={(selectedOption: { value: string }) => {
                          setFieldValue(
                            "method_of_identifcation",
                            selectedOption.value
                          );
                        }}
                        placeholder="select id type"
                        getOptionValue={(status: { value: string }) =>
                          status.value
                        }
                        getOptionLabel={(status: { name: string }) =>
                          status.name
                        }
                        noOptionsMessage={() => "Fetching types..."}
                        isRequired
                      />
                    </div>

                    <AvaterPicker
                      name="photo"
                      label="Photo"
                      isMultiple={false}
                      className="col-span-2"
                      isRequired
                    />

                    {values.method_of_identifcation === "digital_id" && (
                      <FormikInput
                        name={`identification_number`}
                        label="Digital Id Number (FAN Number)"
                        placeholder="Enter FAN number"
                        color="primary"
                        className="col-span-2"
                      />
                    )}

                    {values.method_of_identifcation === "national_id" && (
                      <AvaterPicker
                        name="id_photo"
                        label="Scanned paper id image"
                        isMultiple={false}
                        className="col-span-2"
                      />
                    )}
                  </FormGroup>

                  <FormGroup
                    title="Desposit and Payments"
                    description="Add amounts here..."
                    className={cn(className, "")}
                  >
                    <FormikInput
                      name={`registration_fee`}
                      label="Registration Fee"
                      placeholder="Enter registration fee"
                      color="primary"
                      className=""
                      isRequired
                      type="number"
                    />

                    <FormikInput
                      name={`initial_balance`}
                      label="Deposit"
                      placeholder="Enter registration fee"
                      color="primary"
                      className=""
                      isRequired
                      type="number"
                    />
                  </FormGroup>

                  <FormGroup
                    title="Account Info"
                    description="Add account info here..."
                    className={cn(className, "")}
                  >
                    <div className="mt-4 w-full flex flex-col gap-6 col-span-2">
                      <CustomSelect
                        name="account_type_id"
                        label="Account Types"
                        options={Types}
                        onChange={(selectedOption: { id: string }) => {
                          setFieldValue("account_type_id", selectedOption.id);
                        }}
                        placeholder="select account type"
                        getOptionValue={(type: { id: string }) => type.id}
                        getOptionLabel={(type: { name: string }) => type.name}
                        noOptionsMessage={() =>
                          "Fetching account period types..."
                        }
                        isLoading={accountTypesData.isFetching}
                        isRequired
                      />
                    </div>

                    <FormikInput
                      name={`term_grace_period`}
                      label="Payment Grace Period duration(in days)"
                      placeholder="Enter grace period"
                      color="primary"
                      className=""
                      isRequired
                      type="number"
                    />

                    <FormikInput
                      name="term_amount"
                      label="Term amount"
                      placeholder="Enter amount"
                      color="primary"
                      className=""
                      isRequired
                      type="number"
                    />
                  </FormGroup>
                </div>

                {session?.user?.permissions &&
                  session?.user?.permissions.includes("create:employee") &&
                  !memberId && (
                    <div className="mt-6">
                      <FormFooter
                        submitBtnText="Add Member"
                        showSveBtn={false}
                        isLoading={postMutation.isPending}
                      />
                    </div>
                  )}

                {session?.user?.permissions &&
                  session?.user?.permissions.includes("update:member") &&
                  memberId && (
                    <div className="mt-6">
                      <FormFooter
                        submitBtnText="Update Member"
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
