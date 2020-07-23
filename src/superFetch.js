export default function superFetch(url, payload = {}) {
    url = `http://localhost:8080${url}`;
    console.log('url: ', url);
        let fPromise = fetch(url);
    console.log('fPromise: ', fPromise);

    fPromise
        .then(res => {
            console.log('sdfcfd')
            res.json()
        })
        .then(res => {
            console.log('ressss', res)
        })

    return new Promise((resolve, reject) => {
        console.log('--------0', fPromise)
        fPromise
            .then((res) => {
                let lala = res.json()
                console.log('lala: ', lala);
                return lala;
            })// this trys to parse- get origin error when you have one.
            .then((response) => {
                console.log('response: ', response);
                if (response.ok) {
                    console.log('hereee')
                    return resolve([response.json, null]);
                }
                // extract the error from the server's json
                return resolve([null, response.json]);
            })
            .catch((error) => resolve([null, "No response, check your network connectivity"]));
    });
}



}

