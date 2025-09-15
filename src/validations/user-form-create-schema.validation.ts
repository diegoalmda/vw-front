import z from "zod";

export const userFormCreateSchema = z.object({
  name: z
    .string()
    .min(3, "Nome de usuário precisa ter no mínimo 3 caracteres."),
  password: z
    .string()
    .min(6, "A senha precisa ter no mínimo 6 caracteres.")
    .max(20, "A senha pode ter no máximo 20 caracteres."),
});

export type UserFormSchema = z.infer<typeof userFormCreateSchema>;
