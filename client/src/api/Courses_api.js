import axios from "axios";
const postBaseUrl = "http://localhost:3000";

//department, start are a array of string
export function listCourses(department, text = "", start) {
    let url = `${postBaseUrl}/api/courses`;
    let query = [];
    if (department.length) {
        for (let i = 0; i < department.length; i++) {
            query.push(`department=${department[i]}`);
        }
    }
    if (text) query.push(`text=${text}`);
    if (start.length) {
        for (let i = 0; i < department.length; i++) {
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
