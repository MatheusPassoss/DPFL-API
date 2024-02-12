import { IncomingHttpHeaders } from 'http';
export interface IHttpRequest{
    headers: IncomingHttpHeaders
    body: any
}