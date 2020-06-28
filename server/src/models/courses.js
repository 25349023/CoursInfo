const pgp = require("pg-promise")();
if (!global.db) {
    db = pgp(process.env.DB_URL);
}

/**  List courses satisfying options
 * searchOptions: { text, department, start, full }
 *      text: string,  department: array,
 *      start: [department, subnumber],  full: bool
 */
function list(searchOptions) {
    const { text, department, start, full } = searchOptions;
    let queryingColumns = full
        ? ["cs.*"]
        : [
              "cs.course_number",
              "cs.department",
              "cs.course_subnumber",
              "cs.course_chinese_title",
              "cs.teacher",
          ];
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
        SELECT uniq_cs.*, 
            rt.sweet, rt.cool, rt.recommend
        FROM (
            SELECT ${queryingColumns.join(", ")}
            FROM courses cs
                LEFT JOIN courses rhs
                ON cs.department = rhs.department 
                    AND cs.course_subnumber = rhs.course_subnumber
                    AND cs.semester < rhs.semester
            WHERE rhs.semester IS NULL AND 
                ${queries.join(" AND ")}
            ORDER BY cs.department, cs.course_subnumber
            LIMIT 10
        ) uniq_cs

        LEFT JOIN (
            SELECT course_department, course_subnum,
                avg(sweet)::numeric(3, 2) as sweet,
                avg(cool)::numeric(3, 2) as cool,
                avg(recommend)::numeric(3, 2) as recommend 
            FROM ratings
            GROUP BY course_department, course_subnum
        ) rt
        ON uniq_cs.department = rt.course_department
            AND uniq_cs.course_subnumber = rt.course_subnum
        ORDER BY uniq_cs.department, uniq_cs.course_subnumber;
    `;

    return db.any(sql, { text, department, start });
}

function select(courseId) {
    const { semester, department, courseSubnum } = courseId;

    sql = `
        SELECT cs.*, rt.sweet, rt.cool, rt.recommend FROM courses cs
            JOIN (
                SELECT cs.semester, cs.department, cs.course_subnumber,
                    avg(rt.sweet)::numeric(3, 2) as sweet,
                    avg(rt.cool)::numeric(3, 2) as cool,
                    avg(rt.recommend)::numeric(3, 2) as recommend
                FROM courses cs
                    LEFT JOIN ratings rt
                    ON cs.semester = rt.course_semester
                        AND cs.department = rt.course_department
                        AND cs.course_subnumber = rt.course_subnum
                WHERE (cs.semester, cs.department, cs.course_subnumber) 
                    = ($<semester>, $<department>, $<courseSubnum>)
                GROUP BY cs.semester, cs.department, cs.course_subnumber
                ORDER BY cs.course_number
            ) rt
            ON (cs.semester, cs.department, cs.course_subnumber) 
                = (rt.semester, rt.department, rt.course_subnumber);
    `;

    return db.any(sql, { semester, department, courseSubnum });
}

function dropdownList(semester, department) {
    const sql = `
        SELECT course_number, course_chinese_title, teacher FROM courses
        WHERE semester = $<semester> AND department = $<department>
        ORDER BY course_number;
    `;

    return db.any(sql, { semester, department });
}

module.exports = { list, select, dropdownList };
