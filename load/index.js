function load(url, options) {
    options.method = options.method || 'GET';
    options.responseType = options.responseType || 'json';
    options.body = options.body || null;

    return new Promise((resolve, reject) => {
        if (options.signal) {
            options.signal.addEventListener('abort', reject);
        }

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
