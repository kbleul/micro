import { z } from "zod";

//form  zod validation schema for common tools that have onlt english and amharic name fields
export const commonToolsSchema = z.object({
  nameEn: z.string().min(1, { message: "English Name Is Required" }),
  nameAm: z.string().min(1, { message: "Amharic Name Is Required" }),
});

// generate form types from zod validation schema used for form
export type CommonToolsSchemaVlues = z.infer<typeof commonToolsSchema>;
