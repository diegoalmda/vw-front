import type { LogoutResponse } from "../../interfaces/auth.interface";
import ApiFetchBuilder from "../builders/ApiFetchBuilder";

export default function userLogout() {
  return new ApiFetchBuilder().post("/logout").request<LogoutResponse>();
}
