const sanitizeHtml = require("sanitize-html");

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

module.exports = { checkUser, sanitize };
