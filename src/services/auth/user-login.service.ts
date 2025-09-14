import type {
  LoginPayload,
  LoginResponse,
} from "../../interfaces/auth.interface";
import ApiFetchBuilder from "../builders/ApiFetchBuilder";

export default function userLogin(credentials: LoginPayload) {
  return new ApiFetchBuilder()
    .post("/login")
    .withoutAuth()
    .payload(credentials)
    .request<LoginResponse>();
}
