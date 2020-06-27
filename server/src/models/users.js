const pgp = require("pg-promise")();
const MD5 = require("crypto-js/md5");
if (!global.db) {
    db = pgp(process.env.DB_URL);
}

function create(config) {
    let { email, nickname } = config;
    email = email.trim().toLowerCase();
    let gravatarHash = MD5(email).toString();

    const sql = `
        INSERT INTO users (email, nickname, gravatar_hash, update_time)
        VALUES ($<email>, $<nickname>, $<gravatarHash>, current_date)
        RETURNING *;
    `;

    return db.one(sql, { email, nickname, gravatarHash });
}

function select(userId) {
    const sql = `
        SELECT * FROM users
        WHERE id = $<userId>;
    `;

    return db.any(sql, { userId });
}

function selectOrCreate(config) {
    let { email } = config;
    email = email.trim().toLowerCase();

    const sql = `
        SELECT * FROM users
        WHERE email = $<email>;
    `;
    return db
        .one(sql, { email })
        .then((user) => {
            // select
            return user;
        })
        .catch(() => {
            // create
            return create(config);
        });
}

module.exports = {
    create,
    select,
    selectOrCreate,
};
