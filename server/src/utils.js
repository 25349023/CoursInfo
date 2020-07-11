const sanitizeHtml = require("sanitize-html");

const geQueryType = Object.freeze({
    NORMAL: Symbol("normal"),
    CORE: Symbol("core"),
    BOTH: Symbol("both"),
});

function _parseDepartment(department) {
    const normal = department.indexOf("GE") !== -1,
        core = department.indexOf("GEC") !== -1,
        ftDep = department.filter((dep) => !dep.startsWith("GE"));

    return [ftDep, normal, core];
}

function _GEQuery(geClass = geQueryType.NORMAL, prefix = "") {
    let query = [`${prefix}ge_class IS NOT NULL`];
    switch (geClass) {
        case geQueryType.NORMAL:
            query.push(`${prefix}ge_class NOT ILIKE '%core%'`);
            break;
        case geQueryType.CORE:
            query.push(`${prefix}ge_class ILIKE '%core%'`);
            break;
        case geQueryType.BOTH:
            break;
        default:
            throw new Error("Invalid ge config");
    }
    return query.join(" AND ");
}

function checkUser(userId, req) {
    if (userId !== req.user) {
        const err = new Error("permission Denied");
        err.status = 403;
        throw err;
    }
}

function sanitize(data) {
    for (let key in data) {
        if (typeof data[key] == "string") {
            // data[key] = data[key].replace("\n", "<br>");
            data[key] = sanitizeHtml(data[key], {
                allowedTags: ["b", "i", "em", "strong", "br"],
            });
        }
    }
    return data;
}

module.exports = {
    checkUser,
    sanitize,
    geQueryType,
    _parseDepartment,
    _GEQuery,
};
