import ApiFetchBuilder from "../builders/ApiFetchBuilder";
import type { UpdateUserPayload, User } from "../../interfaces/users.interface";

export default function updateUser(
  userId: User["uuid"],
  payload: UpdateUserPayload
) {
  return new ApiFetchBuilder()
    .put(`/users/${userId}`)
    .payload(payload)
    .request<User>();
}
