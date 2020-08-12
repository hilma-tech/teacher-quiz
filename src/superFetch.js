export default function superFetch(url, payload = null) {
    url = `http://localhost:8080${url}`;
    const fPromise = payload ? fetch(url, payload) : fetch(url);

    return new Promise((resolve, reject) => {
        fPromise
            .then(parseJSON)// this trys to parse- get origin error when you have one.
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


function parseJSON(response) {
    return new Promise((resolve, reject) =>
      response.json()

        .then((json) => resolve({
          status: response.status,
          ok: response.ok,
          json
        }))
        .catch(error => {
          response.status === 204 ? resolve({ ok: response.ok, status: response.status, json: { ok: response.ok } }) : reject(error)
        })
    );
  }