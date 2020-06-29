import axios from "axios";
const postBaseUrl = "https://coursinfonthu.us-east-1.elasticbeanstalk.com";

export function selectUser(userId) {
    let url = `${postBaseUrl}/api/users/${userId}`;
    console.log(`Making GET & selectUser request to: ${url}`);

    return axios.get(url, { withCredentials: true }).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function current() {
    let url = `${postBaseUrl}/api/users/current`;
    console.log(`Making GET & current request to: ${url}`);

    return axios.get(url, { withCredentials: true }).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        if (res.status == 401) return [{ id: "" }];
        return res.data;
    });
}

export function changeName(obj) {
    let url = `${postBaseUrl}/api/users/nickname`;
    console.log(`Making POST & changeName request to: ${url}`);

    return axios.post(url, obj, { withCredentials: true }).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}
