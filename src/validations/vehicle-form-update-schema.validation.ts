import z from "zod";
import { vehicleFormCreateSchema } from "./vehicle-form-create-schema.validation";

export const vehicleUpdateSchema = vehicleFormCreateSchema.extend({
  image: z.any().optional(),
});

export type VehicleUpdateType = z.infer<typeof vehicleUpdateSchema>;
