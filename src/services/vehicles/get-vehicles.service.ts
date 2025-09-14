import type {
  PaginatedVehicles,
  VehicleFilterParams,
} from "../../interfaces/vehicles.interface";
import ApiFetchBuilder from "../builders/ApiFetchBuilder";

export default function getVehicles(filters: VehicleFilterParams) {
  return new ApiFetchBuilder()
    .get("/vehicles")
    .params(filters)
    .request<PaginatedVehicles>();
}
