import {
  type AxiosInstance,
  type AxiosPromise,
  type AxiosRequestConfig,
} from "axios";
import { serialize as serializeToFormData } from "object-to-formdata";

type FetchMethods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type FetchPayload = BodyInit | Record<string, any> | null | undefined;
type FetchParams = Record<string, any> | undefined;

export default class AxiosBuilder {
  protected _method: FetchMethods = "GET";
  protected _url: string = "";
  protected _payload: FetchPayload;
  protected _params: FetchParams;
  protected _headers: Record<string, string> = {};
  protected _bearer?: string;
  protected readonly client: AxiosInstance;

  constructor(client: AxiosInstance) {
    if (!client) {
      throw new Error("Axios client must be provided to AxiosBuilder.");
    }
    this.client = client;
  }

  public get(url: string): this {
    this._method = "GET";
    this._url = url;
    return this;
  }

  public put(url: string): this {
    this._method = "PUT";
    this._url = url;
    return this;
  }

  public patch(url: string): this {
    this._method = "PATCH";
    this._url = url;
    return this;
  }

  public post(url: string): this {
    this._method = "POST";
    this._url = url;
    return this;
  }

  public delete(url: string): this {
    this._method = "DELETE";
    this._url = url;
    return this;
  }

  public payload<TPayload extends FetchPayload>(payload: TPayload): this {
    this._payload = payload;
    return this;
  }

  public formData<TPayload extends FetchPayload>(payload: TPayload): this {
    this._payload = serializeToFormData(payload);
    return this;
  }

  public params<TParams extends FetchParams>(params: TParams): this {
    this._params = params;
    return this;
  }

  public header(key: string, value: string): this {
    this._headers[key] = value;
    return this;
  }

  public bearer(token?: string): this {
    this._bearer = token;
    return this;
  }

  public request<TResponse>(): AxiosPromise<TResponse> {
    const config: AxiosRequestConfig = {
      method: this._method,
      url: this._url,
      headers: { ...this._headers },
    };

    if (this._method === "GET" || this._method === "DELETE") {
      config.params = this._params;
    } else {
      config.data = this._payload;
    }

    if (this._bearer) {
      config.headers!["Authorization"] = `Bearer ${this._bearer}`;
    }

    return this.client.request(config);
  }
}
