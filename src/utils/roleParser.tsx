import { permissionType } from "types/common_types";

export const getParsedPermissions = (
  allPermissions: permissionType[],
  rolePermissions: permissionType[]
) => {
  const rolePermissions_NamesArr = rolePermissions.flatMap(
    (rolePermission) => rolePermission.name
  );

  const parsedPermissions = allPermissions.filter((permission) => {
    return !rolePermissions_NamesArr.includes(permission.name);
  });

  return parsedPermissions;
};
