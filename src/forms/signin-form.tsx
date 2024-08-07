"use client";

import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Title, Text } from "@/components/ui/text";
import Logo from "@public/logo.png";
import { toast } from "sonner";
import useDynamicMutation from "@/react-query/usePostData";
import { useGetHeaders } from "@/hooks/use-get-headers";
import PageLoader from "@/components/loader/page-loader";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { routes } from "@/config/routes";
import { Formik, Form } from "formik";
import { LoginType, loginSchema } from "@/validations/auth.schema";
import FormikInput from "@/components/ui/form/input";
import FormikPasswordInput from "@/components/ui/form/password-input";
import { Role } from "@/constants/role.enum";
import { handleErrorWithToast } from "@/utils/error-toast-handler";


export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchURL = searchParams.get("callbackUrl");

  const { data: session, status } = useSession();
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "Json" });
  const initialValues: LoginType = {
    email: "",
    password: "",
  };
  const initialLoginMutationSubmitHandler = async (values: LoginType) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/login`,
        method: "POST",
        headers,
        body: {
          email: values.email,
          password: values.password,
        },
        onSuccess: (responseData) => {
          const role = responseData?.data?.roles?.map(
            (item: { name: string }) => item.name
          );

          if (!role.includes(Role.ADMIN)) {
            toast.info("Unknown account role.");
            return;
          }
          setIsLoading(true);

          signIn("credentials", {
            data: JSON.stringify({
              ...responseData?.data,
              roles: [...responseData?.data?.roles],
              token: responseData?.data?.access_token,
              user: {
                ...responseData?.data?.user,
                permissions: [...responseData?.data?.permissions],
              },
            }),
            redirect: true,
            callbackUrl: routes.home.dashboard,
          });

          toast.success("Login Successfull, Redirecting...");
        },
        onError: (err) => {
          handleErrorWithToast(err, toast);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (status === "loading") return <PageLoader />;
  if (status === "authenticated") router.push("/");
  if (isLoading) return <PageLoader />;
  if (status === "unauthenticated")
    return (
      <div className="bg-gradient-to-r from-[#013463] to-[#1D6C8B]  flex w-full items-center justify-center min-h-screen p-2">
        <div className="max-w-lg  mx-auto w-full bg-white  p-5 md:p-10 rounded-xl">
          <div className="flex w-full flex-col items-center justify-center">
            <div className="flex flex-col w-full items-center justify-center">
              <Image
                src={Logo}
                alt="logo"
                className="h-[60px] object-contain"
              />
              <div className="flex flex-col items-center space-y-1 py-4">
                <Title as="h4" className=" text-center   ">
                  <>Welcome Back!</>
                </Title>
                <Text as="p" className="font-medium">
                  Log in to access your Dashboard
                </Text>
              </div>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
              onSubmit={initialLoginMutationSubmitHandler}
            >
              {() => (
                <Form className="space-y-5 w-full">
                  <FormikInput
                    type="text"
                    label="Email"
                    name="email"
                    placeholder="Jon Doe"
                    color="primary"
                  />
                  <FormikPasswordInput
                    name="password"
                    label="Password"
                    placeholder="Enter Your Password"
                    color="primary"
                  />
                  <div className="flex items-center justify-between">
                    <Link
                      href={routes.forgotPassword}
                      className="font-medium text-primary-dark hover:text-primary"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <Button
                    className="w-full bg-primary-dark hover:opacity-90 focus-hover:opacity-90"
                    type="submit"
                    size="lg"
                    color="primary"
                    isLoading={postMutation.isPending}
                  >
                    <span>Sign in</span>{" "}
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
}
