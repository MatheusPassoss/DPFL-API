import { IHttpContext } from "../../port/http/IHttpContext";
import { IHttpRequest } from "../../port/http/IHttpRequest";
import { IHttpResponse } from "../../port/http/IHttpResponse";

import { FastifyRequest, FastifyReply } from "fastify";

export class FastifyAdapter implements IHttpContext {

    req: FastifyRequest
    res: FastifyReply

    constructor(req: FastifyRequest, res: FastifyReply) {
        this.req = req;
        this.res = res
    }

    getRequest(): IHttpRequest {
        
        const resquest = {
            headers: this.req.raw.headers,
            body: this.req.body,
            params: this.req.params,
            query: this.req.query
        }

        return resquest
    }



    sendResponse!: () => IHttpResponse;
}