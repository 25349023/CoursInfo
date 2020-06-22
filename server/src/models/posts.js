const pgp = require("pg-promise")();
if (!global.db) {
    db = pgp(process.env.DB_URL);
}

/**  List posts satisfying options
 * searchOptions: { text, department, start }
 *      text: string,  department: array,
 *      start: int
 */
function list(searchOptions) {
    const { text, department, start } = searchOptions;
    let queryingColumns = [
        "cs.course_chinese_title",
        "cs.teacher",
        "ps.title",
        "ps.recommend",
        "ps.likes",
        "ps.dislikes",
        "ps.semester",
        "ps.department",
        "ps.course_subnumber",
    ];
    let textSearchColumns = [
        "ps.title",
        "cs.course_chinese_title",
        "cs.teacher",
    ];
    let queries = ["ps.department IN ($<department:list>)"];

    if (text) {
        let textQry = [];
        for (let col of textSearchColumns) {
            textQry.push(`${col} ILIKE '%$<text:value>%'`);
        }
        queries.push(`(${textQry.join(" OR ")})`);
    }

    if (start) {
        queries.push(`ps.id > $<start>`);
    }

    const sql = `
        SELECT ${queryingColumns.join(", ")}  
        FROM posts ps
            JOIN courses cs
            ON (cs.semester, cs.department, cs.course_subnumber) 
                = (ps.semester, ps.department, ps.course_subnumber)
        WHERE ${queries.join(" AND ")}
        LIMIT 10;
    `;
    console.log(pgp.as.format(sql, { text, department, start }));
    return db.any(sql, { text, department, start });
}

function select(postId) {
    sql = `
        SELECT ps.*, cs.course_chinese_title, cs.teacher, cs.credit 
        FROM posts ps
            JOIN courses cs
            ON (cs.semester, cs.department, cs.course_subnumber) 
                = (ps.semester, ps.department, ps.course_subnumber)
        WHERE ps.id = $<postId>;
    `;

    console.log(pgp.as.format(sql, { postId }));
    return db.one(sql, { postId });
}

module.exports = { list, select };
