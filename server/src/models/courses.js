if (!global.db) {
    const pgp = require("pg-promise")();
    db = pgp(process.env.DB_URL);
}

/**  List courses satisfying options
 * searchOptions: { text, department }
 * start: [department, subnumber]
 */
function list(searchOptions, start = null) {
    const { text, department } = searchOptions;
    let queryingColumns = ["department", "course_subnumber"];
    let textSearchColumns = [
        "course_number",
        "course_chinese_title",
        "teacher",
    ];
    let queries = ["department = $<department>"];
    if (text) {
        for (let col of textSearchColumns) {
            queries.push(`${col} ILIKE '%$<text:value>%'`);
        }
    }

    if (start) {
        queries.push(`(cs.department, cs.course_subnumber) > ($<start:list>)`);
    }

    const sql = ` SELECT * FROM courses
        WHERE ${queries.join(" AND ")}
        LIMIT 10;

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
}
