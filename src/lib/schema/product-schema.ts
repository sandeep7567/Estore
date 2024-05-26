import { z } from "zod";

export const productFormSchema = z
  .object({
    name: z
      .string({ required_error: "name is required" })
      .min(1, { message: "enter name please" }),
    price: z.coerce
      .number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
      })
      .positive()
      .gte(0),
    featured: z.boolean().default(false),
    archived: z.boolean().default(false),
    properties: z
      .array(
        z.object({
          name: z
            .string()
            .min(1, "Name is required")
            .refine((data) => !/\s/.test(data), {
              message: "Value must not contain whitespace",
            }),
          value: z
            .string()
            .min(1, "Value is required")
            .refine((data) => data.includes(","), {
              message: "Value must include a comma",
            })
            .refine((data) => !/\s/.test(data), {
              message: "Value must not contain whitespace",
            }),
        }),
        { message: "Please provide a name and value" }
      )
      .min(1, { message: "At least one property is required" }),
    imagePreview: z.string().optional(),
    imageFile: z.instanceof(File, { message: "Image is required" }).optional(),
  })
  .refine((data) => data.imagePreview || data.imageFile, {
    message: "Image url or file is required",
    path: ["imageFile"],
  });

export type ProductFormType = z.infer<typeof productFormSchema>;
