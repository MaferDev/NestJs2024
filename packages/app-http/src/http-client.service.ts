import { Inject, Injectable } from "@nestjs/common";
import axios, { AxiosResponse } from "axios";
import { HTTP_CLIENT_MODULE_OPTIONS } from "./http-client.constants";
import { HttpClientModuleOptions } from "./http-client.interface";

@Injectable()
export class HttpClientService {
  private apiUrl;
  private apiKey;
  constructor(
    @Inject(HTTP_CLIENT_MODULE_OPTIONS)
    private readonly options: HttpClientModuleOptions
  ) {
    this.apiUrl = this.options.apiUrl;
    this.apiKey = this.options.apiKey;
  }

  async fetch(method: string, data: any): Promise<AxiosResponse<any>> {
    return axios({
      method,
      url: `${this.apiUrl}`,
      data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }
}
