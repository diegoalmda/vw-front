import AxiosBuilder from "./AxiosBuilder";
import { useAuthStore } from "../../stores/auth-store";
import apiInstance from "../api/axios-instance";

export default class ApiFetchBuilder extends AxiosBuilder {
  constructor() {
    super(apiInstance);
    this.setBearerFromStore();
  }

  private setBearerFromStore(): void {
    const { accessToken } = useAuthStore.getState();
    this._bearer = accessToken ?? undefined;
  }

  public withoutAuth(): this {
    this._bearer = undefined;
    return this;
  }
}
