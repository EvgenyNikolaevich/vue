export class SendRequest {
    constructor(method, url, headers = {}, body = {}) {
        this.method = method;
        this.url = url;
        this.headers = headers;
        this.body = body;
    }

    getResponse() {
        return fetch(this.url).then((resp) => resp.json());
    }
}
