function load(url, options = { method: 'GET', body: null, responseType: 'json' }) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(options.method, url);
        xhr.responseType = options.responseType;
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = () => {
            resolve({ status: xhr.status, body: xhr.response, statusText: xhr.statusText });
        };

        xhr.onerror = () => {
            reject(xhr.response);
        };

        xhr.send(JSON.stringify(options.body));
    });
}
