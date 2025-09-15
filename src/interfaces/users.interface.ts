export interface CreateUserPayload {
  name: string;
  password: string;
  isRoot: boolean;
}

export interface UpdateUserPayload {
  name: string;
  isActived: boolean;
}

export interface User {
  uuid: string;
  name: string;
  password: string;
  isRoot: boolean;
  isActived: boolean;
  creationDate: string;
  updatedDate: string;
}
