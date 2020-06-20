const pgp = require("pg-promise")();
if (!global.db) {
    db = pgp(process.env.DB_URL);
}

/**  List courses satisfying options
 * searchOptions: { text, department }
 *      text: string,  department: array
 * start: [department, subnumber]
 */
function list(searchOptions) {
    const { text, department, start } = searchOptions;
    let queryingColumns = ["department", "course_subnumber"];
    let textSearchColumns = [
        "course_number",
        "course_chinese_title",
        "teacher",
    ];
    let queries = ["cs.department IN ($<department:list>)"];
    if (text) {
        let textQry = [];
        for (let col of textSearchColumns) {
            textQry.push(`cs.${col} ILIKE '%$<text:value>%'`);
        }
        queries.push(`(${textQry.join(" OR ")})`);
    }

    if (start) {
        queries.push(`(cs.department, cs.course_subnumber) > ($<start:list>)`);
    }

    const sql = `
        SELECT cs.*
        FROM courses cs
            LEFT JOIN courses rhs
            ON cs.department = rhs.department 
                AND cs.course_subnumber = rhs.course_subnumber
                AND cs.semester < rhs.semester
        WHERE rhs.semester IS NULL AND 
            ${queries.join(" AND ")}
        ORDER BY cs.department, cs.course_subnumber
        LIMIT 10;	
    `;
    console.log(pgp.as.format(sql, { text, department, start }));
    return db.any(sql, { text, department, start });
}

module.exports = { list };
