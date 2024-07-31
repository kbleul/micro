import { permissionType } from "types/common_types";

export const getParsedPermissions = (
  allPermissions: permissionType[],
  rolePermissions: permissionType[]
) => {
  const rolePermissions_NamesArr = rolePermissions.flatMap(
    (rolePermission) => rolePermission.Name
  );

  const parsedPermissions = allPermissions.filter((permission) => {
    return !rolePermissions_NamesArr.includes(permission.Name);
  });

  return parsedPermissions;
};
