"use client";

import { Button } from "@/components/ui/button";
import { Title } from "@/components/ui/text";
import { PiXBold } from "react-icons/pi";
import { ActionIcon } from "@/components/ui/action-icon";
import { toast } from "sonner";
import useDynamicMutation from "@/react-query/usePostData";
import { useQueryClient } from "@tanstack/react-query";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import { useModal } from "@/app/shared/modal-views/use-modal";
import Loading from "@/components/ui/Loading";

import { Checkbox } from "rizzui";
import Spinner from "@/components/ui/spinner";
import AddRolePermissions from "./AddRolePermissions";

export default function ViewRolePermissions({
  id,
  slug,
}: {
  id: string;
  slug: string;
}) {
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();

  const { openModal } = useModal();

  const headers = useGetHeaders({ type: "Json" });
  const { closeModal } = useModal();

  const permissionsData = useFetchData(
    [queryKeys.getAllPermissions + id, id],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}user-roles/${slug}/permissions`,
    headers
  );

  if (permissionsData.isFetching) {
    return <Loading />;
  }

  const Permissions: any[] = permissionsData?.data?.data ?? [];

  const handleUpdatePermission = async (permission_slug: string) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}user-roles/revoke-role-permission`,
        method: "POST",
        headers,
        body: {
          role_slug: slug,
          permission: permission_slug,
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllPermissions + id],
          });
          toast.success("Permission revoked Successfully");
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7 relative">
      <ActionIcon
        size="sm"
        variant="text"
        onClick={() => closeModal()}
        className="absolute top-4 right-4"
      >
        <PiXBold className="h-auto w-5" />
      </ActionIcon>

      <div className="mb-2  mt-8">
        <Title as="h4" className="font-semibold capitalize">
          {slug}
        </Title>

        <Title as="h6" className="font-medium">
          {"Role Permissions"}
        </Title>
      </div>

      {Permissions.length === 0 && (
        <div className="my-10 flex flex-col gap-y-5 items-center justify-center ">
          <p>No permissions added yet.</p>

          <Button
            size="lg"
            color="primary"
            className="text-white bg-primary-dark"
            onClick={() =>
              openModal({
                view: <AddRolePermissions id={id} slug={slug} />,
                customSize: "1150px",
              })
            }
          >
            Add Permissions
          </Button>
        </div>
      )}

      {Permissions.length > 0 && (
        <article>
          <div className="mb-2 flex justify-end  ">
            <Button
              size="lg"
              color="primary"
              className="text-white bg-primary-dark"
              onClick={() =>
                openModal({
                    view: <AddRolePermissions id={id} slug={slug} />,
                    customSize: "1150px",
                })
              }
            >
              Add Permissions
            </Button>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-4 mt-4 px-6 gap-5 border-t py-6 justify-center items-center">
            {Permissions.map(
              (permission: { id: string; name: string; slug: string }) => (
                <div key={permission.id}>
                  <Checkbox
                    className="m-2 checked:bg-primary-dark"
                    label={permission.name}
                    iconClassName="text-red-400 checked:bg-primary-dark"
                    value={permission.slug}
                    defaultChecked={true}
                    onChange={(e) => handleUpdatePermission(e.target.value)}
                    disabled={postMutation.isPending}
                  />
                </div>
              )
            )}
          </section>

          {postMutation.isPending && (
            <section className="flex justify-center items-center my-4 text-primary">
              <Spinner size="sm" />
            </section>
          )}
        </article>
      )}
    </div>
  );
}
