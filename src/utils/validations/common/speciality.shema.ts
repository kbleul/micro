import { z } from "zod";

//form  zod validation schema for common tools that have onlt english and amharic name fields
export const specialitySchema = z.object({
  nameEn: z.string().min(1, { message: "English Name Is Required" }),
  nameAm: z.string().min(1, { message: "Amharic Name Is Required" }),
  descriptionEn: z.string().min(1, { message: "English Description Is Required" }),
  descriptionAm: z.string().min(1, { message: "Amharic Description Is Required" }),
});

// generate form types from zod validation schema used for form
export type SpecialitySchemaVlues = z.infer<typeof specialitySchema>;
