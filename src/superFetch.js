
function superFetch(url, payload) {
    url=`$http/localhost:8080${url}`;

    let fPromise = payload == null ? fetch(url) : fetch(url, payload);

    return new Promise((resolve, reject) => {
        fPromise
            .then(this.parseJSON)// this trys to parse- get origin error when you have one.
            .then((response) => {
                if (response.ok) {
                    return resolve([response.json, null]);
                }
                // extract the error from the server's json
                return resolve([null, response.json]);
            })
            .catch((error) => resolve([null, "No response, check your network connectivity"]));
    });
}

export async function superAuthFetch(url, payload = null, redirOnFailure = false) {
    let [res, err] = await superFetch(url, payload);
    if (err && err.error && err.error.statusCode === 401 && redirOnFailure === true) {
        Auth.logout(() => window.location.href = window.location.origin); //FORCE LOGOUT.      
    }
    return [res, err];
}


