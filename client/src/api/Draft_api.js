import axios from "axios";
const postBaseUrl = "https://coursinfonthu.us-east-1.elasticbeanstalk.com";

export function listDraft(userId) {
    let url = `${postBaseUrl}/api/drafts/user/${userId}`;
    console.log(`Making GET & listdraft request to: ${url}`);
    return axios.get(url, { withCredentials: true }).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function selectDraft(draftId, userId) {
    let url = `${postBaseUrl}/api/drafts/${draftId}?userId=${userId}`;
    console.log(`Making GET & selectdraft request to: ${url}`);
    return axios.get(url, { withCredentials: true }).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function createDraft(post) {
    let url = `${postBaseUrl}/api/drafts`;
    console.log(`Making POST & createdraft request to: ${url}`);
    return axios
        .post(url, post, { withCredentials: true })
        .then(function (res) {
            if (res.status !== 200)
                throw new Error(`Unexpected response code: ${res.status}`);
            return res.data;
        });
}

export function editDraft(draftId, obj) {
    let url = `${postBaseUrl}/api/drafts/${draftId}`;
    console.log(`Making PUT & editdraft request to: ${url}`);
    return axios.put(url, obj, { withCredentials: true }).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function deleteDraft(draftId, obj) {
    let url = `${postBaseUrl}/api/drafts/${draftId}`;
    console.log(`Making DELETE & deletedraft request to: ${url}`);
    console.log(obj);
    return axios
        .delete(url, { data: obj, withCredentials: true })
        .then(function (res) {
            if (res.status !== 200)
                throw new Error(`Unexpected response code: ${res.status}`);
            return res.data;
        });
}
