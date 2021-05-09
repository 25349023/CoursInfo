const pgp = require("pg-promise")();
const MD5 = require("crypto-js/md5");
pgp.pg.defaults.ssl = true;
if (!global.db) {
    db = pgp({
        connectionString: process.env.DB_URL,
        ssl: { rejectUnauthorized: false },
    });
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

function changeName(userId, newName) {
    const sql = `
        UPDATE users
        SET nickname = $<newName>
        WHERE id = $<userId>
        RETURNING *;
    `;

    return db.any(sql, { userId, newName });
}

function loginUpdate(userId) {
    const sql = `
        UPDATE users
        SET update_time = current_date,
            daily_publish_count = 0
        WHERE id = $<userId>
        RETURNING *;
    `;

    const dateSql = `
        SELECT update_time from users
        WHERE id = $<userId>;
    `;

    return db.one(dateSql, { userId }).then((date) => {
        let originDate = new Date(date.update_time),
            now = new Date();
        if (
            originDate.getFullYear() !== now.getFullYear() ||
            originDate.getMonth() !== now.getMonth() ||
            originDate.getDate() !== now.getDate()
        ) {
            console.log("update user");
            return db.any(sql, { userId });
        } else {
            console.log("no op");
            return select(userId);
        }
    });
}

module.exports = {
    create,
    select,
    selectOrCreate,
    changeName,
    loginUpdate,
};
