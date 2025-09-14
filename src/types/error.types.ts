import type { AxiosError } from "axios";

export interface ApiError {
  message: string;
  code: string;
  success: boolean;
}

export interface AxiosApiError extends AxiosError {
  response?: {
    data: ApiError;
    status: number;
    statusText: string;
    headers: any;
    config: any;
  };
}
