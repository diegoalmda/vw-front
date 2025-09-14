import type { VehicleModel } from "../../interfaces/vehicles.interface";
import ApiFetchBuilder from "../builders/ApiFetchBuilder";

export default function getVehiclesModels() {
  return new ApiFetchBuilder().get("/models").request<VehicleModel[]>();
}
