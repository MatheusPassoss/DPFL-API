import { IHttpResponse } from "./IHttpResponse";
import { IHttpRequest } from "./IHttpRequest";

export interface IHttpContext {
    getRequest: () => IHttpRequest;
    sendResponse: () => IHttpResponse
}