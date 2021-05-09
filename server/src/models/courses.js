const pgp = require("pg-promise")();
pgp.pg.defaults.ssl = true;
if (!global.db) {
    db = pgp(process.env.DB_URL);
}

const { geQueryType, _parseDepartment, _GEQuery } = require("../utils");

/**  List courses satisfying options
 * searchOptions: { text, department, start, full }
 *      text: string,  department: array,
 *      start: [department, subnumber],  full: bool
 */
function list(searchOptions) {
    const { text, start, full } = searchOptions;
    let originDep = searchOptions.department;
    originDep = Array.isArray(originDep) ? originDep : [originDep];

    let [department, normal, core] = _parseDepartment(originDep);

    let queryingColumns = full
            ? ["cs.*"]
            : [
                  "cs.course_number",
                  "cs.department",
                  "cs.course_subnumber",
                  "cs.course_chinese_title",
                  "cs.teacher",
              ],
        textSearchColumns = [
            "course_number",
            "course_chinese_title",
            "teacher",
        ];

    let departmentQry = department.length
        ? ["cs.department IN ($<department:list>)"]
        : [];

    if (normal && core) {
        departmentQry.push(_GEQuery(geQueryType.BOTH, "cs."));
    } else if (normal) {
        departmentQry.push(_GEQuery(geQueryType.NORMAL, "cs."));
    } else if (core) {
        departmentQry.push(_GEQuery(geQueryType.CORE, "cs."));
    }

    let queries = [departmentQry.join(" OR ")];

    if (text) {
        let textQry = [];
        for (let col of textSearchColumns) {
            textQry.push(`cs.${col} ILIKE '%$<text:value>%'`);
        }
        queries.push(`${textQry.join(" OR ")}`);
    }

    if (start) {
        queries.push(`(cs.department, cs.course_subnumber) > ($<start:list>)`);
    }

    const sql = _genListSql({ queryingColumns, queries });
    // console.log(pgp.as.format(sql, { text, department, start }));

    return db.any(sql, { text, department, start });
}

function _genListSql(options) {
    let { queryingColumns, queries } = options;
    queries = queries.map((q) => `(${q})`);

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

    return sql;
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
    let depQry;
    if (department === "GE") {
        depQry = _GEQuery(geQueryType.NORMAL);
    } else if (department === "GEC") {
        depQry = _GEQuery(geQueryType.CORE);
    } else {
        depQry = "department = $<department>";
    }

    const sql = `
        SELECT department, course_subnumber, course_chinese_title, teacher FROM courses
        WHERE semester = $<semester> AND ${depQry}
        ORDER BY department, course_subnumber;
    `;

    return db.any(sql, { semester, department });
}

function history(department, subnumber) {
    const sql = `
        SELECT semester, department, course_subnumber, teacher 
        FROM courses
        WHERE department = $<department> AND course_subnumber = $<subnumber>
        ORDER BY semester DESC;
    `;

    return db.any(sql, { department, subnumber });
}

module.exports = { list, select, dropdownList, history };
