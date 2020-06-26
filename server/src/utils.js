function checkUser(userId, req) {
    if (userId != req.user) {
        const err = new Error("permission Denied");
        err.status = 403;
        throw err;
    }
}

module.exports = { checkUser };
