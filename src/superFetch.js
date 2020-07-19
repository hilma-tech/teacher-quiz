import { ShoppingCartSharp } from "@material-ui/icons";


var fetch = require("fetch").fetchUrl;


// 


function superFetch(url, payload = {}) {
    url = `http://localhost:8080${url}`;
    console.log('url: ', url);

    let fPromise = fetch(url);
    console.log('fPromise: ', fPromise);

    fPromise
        .then(res => {
            console.log('sdfcfd')
            res.json()})
        .then(res => {
            console.log('ressss', res)
        })

    return new Promise((resolve, reject) => {
        console.log('--------0', fPromise)
        fPromise
            .then(p => {
                console.log('------------1')
                let lala = p.parseJSON
                // console.log('lala: ', lala);
                return lala;

            }) // this trys to parse- get origin error when you have one.
            .then((response) => {
                console.log('----3', response)
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

export default async function superAuthFetch(url, payload = null, redirOnFailure = false) {
    let [res, err] = await superFetch(url, payload);
    if (err && err.error && err.error.statusCode === 401 && redirOnFailure === true) {
        console.log('error');
    }
    return [res, err];


}

