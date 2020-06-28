import axios from "axios";
const postBaseUrl = "http://localhost:3000";

export function listDraft(userId) {
    let url = `${postBaseUrl}/api/drafts/user/${userId}`;
    console.log(`Making GET & listdraft request to: ${url}`);
    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function selectDraft(draftId) {
    let url = `${postBaseUrl}/api/drafts/${draftId}`;
    console.log(`Making GET & selectdraft request to: ${url}`);
    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function createDraft() {
    let url = `${postBaseUrl}/api/drafts`;
    console.log(`Making POST & createdraft request to: ${url}`);
    return axios.post(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function editDraft(draftId) {
    let url = `${postBaseUrl}/api/drafts/${draftId}`;
    console.log(`Making PUT & editdraft request to: ${url}`);
    return axios.put(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function deleteDraft(draftId) {
    let url = `${postBaseUrl}/api/drafts/${draftId}`;
    console.log(`Making DELETE & deletedraft request to: ${url}`);
    return axios.delete(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}
