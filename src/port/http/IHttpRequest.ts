import { IncomingHttpHeaders } from 'http';
export interface IHttpRequest{
    headers: IncomingHttpHeaders
    body: any
    params?: any
    query?: any
}