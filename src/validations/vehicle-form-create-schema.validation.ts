import { z } from "zod";

const FIVE_MEGABYTES = 5000000;

export const vehicleFormCreateSchema = z.object({
  model: z.string().min(1, "O modelo é obrigatório"),
  color: z.string().min(1, "A cor é obrigatória"),
  year: z.coerce
    .number()
    .min(2000, "O ano mínimo é 2000")
    .max(
      new Date().getFullYear() + 1,
      "O ano não pode ser maior que o ano atual"
    ),
  image: z
    .union([
      z
        .instanceof(File, { message: "Image is required" })
        .refine(
          (file) => !file || file.size !== 0 || file.size <= FIVE_MEGABYTES,
          {
            message: "Excedeu limite",
          }
        ),
      z.string().optional(),
    ])
    .refine((value) => value instanceof File || typeof value === "string", {
      message: "Imagem é obrigatória",
    }),
});

export type VehicleFormType = z.infer<typeof vehicleFormCreateSchema>;
