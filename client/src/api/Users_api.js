import axios from "axios";
const postBaseUrl = "http://localhost:3000";

export function selectUser(userId) {
    let url = `${postBaseUrl}/api/users/:${userId}`;
    console.log(`Making GET & selectUser request to: ${url}`);

    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}
