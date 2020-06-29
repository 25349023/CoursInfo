import axios from "axios";
const postBaseUrl = "http://localhost:3000";

//department, start are a array of string
export function listPosts(department, text = "", start) {
    let url = `${postBaseUrl}/api/posts`;
    let query = [];
    if (department.length) {
        for (let i = 0; i < department.length; i++) {
            query.push(`department=${department[i]}`);
        }
    }
    if (text) query.push(`text=${text}`);
    if (query.length) url += "?" + query.join("&");
    if (start) url += `&start=${start}`;
    console.log(`Making GET & listPosts request to: ${url}`);

    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function selectPost(postId) {
    let url = `${postBaseUrl}/api/posts/${postId}`;
    console.log(`Making GET & selectPost request to: ${url}`);
    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function listPostsUser(userId) {
    let url = `${postBaseUrl}/api/posts/users/${userId}`;
    console.log(`Making GET & selectPost request to: ${url}`);
    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

//post is a big object
export function createPost(post) {
    let url = `${postBaseUrl}/api/posts`;
    console.log(`Making POST & createPost request to: ${url}`);
    return axios
        .post(url, post, { withCredentials: true })
        .then(function (res) {
            if (res.status !== 200)
                throw new Error(`Unexpected response code: ${res.status}`);

            return res.data;
        });
}

export function editPost(postId, post) {
    let url = `${postBaseUrl}/api/posts/${postId}`;
    console.log(`Making PUT & editPost request to: ${url}`);
    return axios.put(url, post, { withCredentials: true }).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function deletePost(postId, obj) {
    let url = `${postBaseUrl}/api/posts/${postId}`;
    console.log(`Making DELETE & deletePost request to: ${url}`);
    return axios
        .delete(url, { data: obj, withCredentials: true })
        .then(function (res) {
            if (res.status !== 200)
                throw new Error(`Unexpected response code: ${res.status}`);

            return res.data;
        });
}

//islike = 1 means like, = 0 means dislike, = 2 means cancel
export function createVote(postId, islike) {
    let url = `${postBaseUrl}/api/posts/${postId}`;
    if (islike == 0) url += `/like`;
    else if (islike == 1) url += `/dislike`;
    else if (islike == 2) url += `/cancelVote`;
    console.log(`Making POST & createVote request to: ${url}`);
    return axios.post(url, { withCredentials: true }).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function getVote(userId, postId) {
    let url = `${postBaseUrl}/api/posts/${postId}-${userId}/vote`;

    console.log(`Making GET & getVote request to: ${url}`);
    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function getsimplePost(dep, subnum) {
    let url = `${postBaseUrl}/api/posts/${dep}-${subnum}`;

    console.log(`Making GET & getsimplePost request to: ${url}`);
    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}
