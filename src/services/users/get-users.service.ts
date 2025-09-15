import ApiFetchBuilder from "../builders/ApiFetchBuilder";
import type { User } from "../../interfaces/users.interface";

export default function getUsers() {
  return new ApiFetchBuilder().get("/users").request<User[]>();
}
