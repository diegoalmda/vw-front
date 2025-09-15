import type { CreateUserPayload, User } from "../../interfaces/users.interface";
import ApiFetchBuilder from "../builders/ApiFetchBuilder";

export default function createUser(payload: CreateUserPayload) {
  return new ApiFetchBuilder().post("/users").payload(payload).request<User>();
}
