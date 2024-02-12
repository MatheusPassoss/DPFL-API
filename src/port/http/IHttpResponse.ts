import { IncomingHttpHeaders } from 'http';

export interface IHttpResponse {
    headers: IncomingHttpHeaders[]
    body: any
}