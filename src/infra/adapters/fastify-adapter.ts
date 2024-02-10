import { IHttpContext } from "../../port/http/IHttpContext";
import { IHttpRequest } from "../../port/http/IHttpRequest";
import { IHttpResponse } from "../../port/http/IHttpResponse";


export class FastifyAdapter implements IHttpContext {

    getRequest: () => IHttpRequest;

    sendResponse: () =>  IHttpResponse;
}