import * as Yup from "yup";
export const permissionSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});


type PermissionType = Yup.InferType<typeof permissionSchema>;

export type { PermissionType };
