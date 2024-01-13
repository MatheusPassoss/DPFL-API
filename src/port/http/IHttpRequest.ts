
interface IHttpRequest<Body, METHOD, Headers> {
    method: METHOD
    headers: Headers
    body: Body
}