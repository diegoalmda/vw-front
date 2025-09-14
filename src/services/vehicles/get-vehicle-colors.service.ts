import type { VehicleColor } from "../../interfaces/vehicles.interface";
import ApiFetchBuilder from "../builders/ApiFetchBuilder";

export default function getVehiclesColors() {
  return new ApiFetchBuilder().get("/colors").request<VehicleColor[]>();
}
