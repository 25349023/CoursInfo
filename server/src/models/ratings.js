const pgp = require("pg-promise")();
pgp.pg.defaults.ssl = true;
if (!global.db) {
    db = pgp({
        connectionString: process.env.DB_URL,
        ssl: { rejectUnauthorized: false },
    });
}

function create(userId, options) {
    const sql = `
        INSERT INTO ratings(course_semester, course_department,
            course_subnum, user_id, sweet, cool, recommend)
        VALUES ($<semester>, $<department>, $<subnumber>,
            $<userId>, $<sweet>, $<cool>, $<recommend>)
        RETURNING *;
    `;

    return db.any(sql, { userId, ...options });
}

function edit(userId, options) {
    const sql = `
        UPDATE ratings
        SET sweet = $<sweet>,
            cool = $<cool>,
            recommend = $<recommend>
        WHERE user_id = $<userId> AND 
            (course_semester, course_department, course_subnum) = 
            ($<semester>, $<department>, $<subnumber>)
        RETURNING *;
    `;

    return db.any(sql, { userId, ...options });
}

function createOrEdit(userId, options) {
    return create(userId, options).catch((err) => {
        console.log(err);
        return edit(userId, options);
    });
}

function select(userId, course) {
    const sql = `
        SELECT * FROM ratings
        WHERE user_id = $<userId> AND 
            (course_semester, course_department, course_subnum) = 
            ($<semester>, $<department>, $<subnumber>);
    `;

    return db.any(sql, { userId, ...course });
}

module.exports = { createOrEdit, select };
