import * as Yup from "yup";
export const PermissionSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

type PermissionType = Yup.InferType<typeof PermissionSchema>;

export type { PermissionType };
