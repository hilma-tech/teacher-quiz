
export default function superFetch(url, payload) {
    url = `http://localhost:8080${url}`;

    let fPromise = payload == null ? fetch(url) : fetch(url, payload);

    return new Promise((resolve, reject) => {
        fPromise
            .then((res) => {
                let lala = res.json()
                console.log('lala: ', lala);
                return lala;
            })// this trys to parse- get origin error when you have one.
            .then((response) => {
                console.log('response: ', response);
                if (response.ok) {
                    return resolve([response.json, null]);
                }
                // extract the error from the server's json
                return resolve([null, response.json]);
            })
            .catch((error) => resolve([null, "No response, check your network connectivity"]));
    });
}



