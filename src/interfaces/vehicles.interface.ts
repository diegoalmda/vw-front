export interface VehicleModel {
  uuid: string;
  name: string;
}

export interface VehicleColor {
  uuid: string;
  name: string;
}

export interface Vehicle {
  uuid: string;
  creationUserName: string;
  updatedUserName: string;
  creationDate: string;
  updatedDate: string;
  model: VehicleModel;
  color: VehicleColor;
  year: number;
  imagePath: string;
}

export interface PaginatedVehicles {
  data: Vehicle[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  next_page: number | null;
  prev_page: number | null;
}

export type VehicleSortBy = "creationDate" | "year" | "model" | "color";
export type VehicleSortOrder = "asc" | "desc";

export interface VehicleFilterParams {
  page?: number;
  per_page?: number;
  sort?: VehicleSortBy;
  order?: VehicleSortOrder;
  search?: string;
}

export interface VehicleCreatePayload {
  model: string;
  color: string;
  year: number;
  image: File;
}
