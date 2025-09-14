import type {
  PaginatedVehicles,
  VehicleCreatePayload,
} from "../../interfaces/vehicles.interface";
import ApiFetchBuilder from "../builders/ApiFetchBuilder";

export default function createVehicle(formData: VehicleCreatePayload) {
  return new ApiFetchBuilder()
    .post("/vehicles")
    .formData(formData)
    .request<PaginatedVehicles>();
}
