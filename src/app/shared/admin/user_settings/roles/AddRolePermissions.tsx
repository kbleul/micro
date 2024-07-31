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
import { getParsedPermissions } from "@/utils/roleParser";
import { permissionType } from "types/common_types";
import { useState } from "react";

export default function AddRolePermissions({
  id,
  slug,
}: {
  id: string;
  slug: string;
}) {
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();

  const headers = useGetHeaders({ type: "Json" });
  const { closeModal } = useModal();

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const allPermissionsData = useFetchData(
    [queryKeys.getAllPermissions, id],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}user-permissions`,
    headers
  );

  const rolePermissionsData = useFetchData(
    [queryKeys.getAllPermissions + slug, id],
    `${process.env.NEXT_PUBLIC_BACKEND_URL}user-roles/${slug}/permissions`,
    headers
  );

  if (allPermissionsData.isFetching && rolePermissionsData.isFetching) {
    return <Loading />;
  }

  const AllPermissions: permissionType[] = allPermissionsData?.data?.data ?? [];
  const RolePermissions: permissionType[] =
    rolePermissionsData?.data?.data ?? [];

  const unassignedPermissions: permissionType[] = getParsedPermissions(
    AllPermissions,
    RolePermissions
  );

  const handleUpdatePermission = async () => {
    console.log(selectedPermissions)
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}user-roles/assign-permissions`,
        method: "POST",
        headers,
        body: {
          role_slug: slug,
          permissions: [...selectedPermissions],
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllPermissions],
          });
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllPermissions + slug],
          });
          toast.success("Permission assigned Successfully");
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheck = (value: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(value)
        ? prev.filter((per) => per !== value)
        : [...prev, value]
    );
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

      <div className="mb-7  mt-8">
        <Title as="h4" className="font-semibold">
          {"Admin"}
        </Title>

        <Title as="h6" className="font-medium">
          {"Assign Role Permissions"}
        </Title>
      </div>

      {unassignedPermissions.length === 0 && (
        <div className="my-10 flex flex-col gap-y-5 items-center justify-center text-lg ">
          <p>You have been granted all permissions</p>
        </div>
      )}

      <article>
        <section className="grid grid-cols-1 md:grid-cols-4 mt-4 px-6 gap-5 border-t py-6 justify-center items-center">
          {unassignedPermissions.map((permission) => (
            <div key={permission.ID}>
              <Checkbox
                className="m-2 checked:bg-primary-dark"
                label={permission.Name}
                iconClassName="text-red-400 checked:bg-primary-dark"
                value={permission.Slug}
                defaultChecked={false}
                onChange={(e) => handleCheck(e.target.value)}
                disabled={postMutation.isPending}
              />
            </div>
          ))}
        </section>

       {unassignedPermissions.length !== 0 &&  <div className="col-span-2 flex items-end justify-end gap-4 mt-10">
          <Button
            color="primary"
            className="px-10 text-white bg-primary-dark"
            type="submit"
            isLoading={postMutation.isPending}
            onClick={handleUpdatePermission}
          >
            Assign
          </Button>
        </div>}
      </article>
    </div>
  );
}
