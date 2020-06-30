import axios from "axios";
const postBaseUrl = "https://coursinfonthu.us-east-1.elasticbeanstalk.com";

//department, start are a array of string
export function listCourses(department, text = "", start) {
    let url = `${postBaseUrl}/api/courses`;
    let query = [];
    if (department.length) {
        for (let i = 0; i < department.length; i++) {
            query.push(`department=${department[i]}`);
        }
    } else {
        query.push(`department=AB`);
    }
    if (text) query.push(`text=${text}`);
    if (start.length) {
        for (let i = 0; i < start.length; i++) {
            query.push(`start=${start[i]}`);
        }
    }
    if (query.length) url += "?" + query.join("&");
    console.log(`Making GET & listCourses request to: ${url}`);

    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function selectCourse(smt, dep, subnum) {
    let url = `${postBaseUrl}/api/courses/${smt}-${dep}-${subnum}`;
    console.log(`Making GET & selectCourse request to: ${url}`);
    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function getdropdown(smt, dep) {
    let url = `${postBaseUrl}/api/courses/${smt}-${dep}`;

    console.log(`Making GET & getdropdown request to: ${url}`);
    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function getrating(userId, smt, dep, subnum) {
    let url = `${postBaseUrl}/api/ratings/${userId}/${smt}-${dep}-${subnum}`;

    console.log(`Making GET & getratings request to: ${url}`);
    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function createrating(obj) {
    let url = `${postBaseUrl}/api/ratings`;

    console.log(`Making POST & createratings request to: ${url}`);
    return axios.post(url, obj, { withCredentials: true }).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function gethistory(dep, subnum) {
    let url = `${postBaseUrl}/api/courses/history/${dep}-${subnum}`;

    console.log(`Making GET & gethistory request to: ${url}`);
    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}
