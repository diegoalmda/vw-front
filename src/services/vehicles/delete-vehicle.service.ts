import type { Vehicle } from "../../interfaces/vehicles.interface";
import ApiFetchBuilder from "../builders/ApiFetchBuilder";

export default function deleteVehicle(vehicleId: Vehicle["uuid"]) {
  return new ApiFetchBuilder()
    .delete(`/vehicles/${vehicleId}`)
    .request<Vehicle>();
}
