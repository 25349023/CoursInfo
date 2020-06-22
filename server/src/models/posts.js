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
        "ps.id",
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
        queries.push(`ps.id < $<start>`);
    }

    const sql = `
        SELECT ${queryingColumns.join(", ")}  
        FROM posts ps
            JOIN courses cs
            ON (cs.semester, cs.department, cs.course_subnumber) 
                = (ps.semester, ps.department, ps.course_subnumber)
        WHERE ${queries.join(" AND ")}
        ORDER BY id DESC
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

function create(data) {
    const sql = `
        INSERT INTO posts (user_id, semester, department, course_subnumber, title,
            course_type, sweet, cool, recommend, info, prerequisite, teach_method,
            assignment, exam, evaluation, textbook, teacher_character, ta_performance,
            main_review, personal_grade, class_grade_dist, others)
        VALUES (
            $<userId>, 
            $<semester>,
            $<department>,
            $<courseSubnumber>,
            $<title>,
            $<courseType>,
            $<sweet>,
            $<cool>,
            $<recommend>,
            $<info>,
            $<prerequisite>,
            $<teachMethod>,
            $<assignment>,
            $<exam>,
            $<evaluation>,
            $<textbook>,
            $<teacherCharacter>,
            $<taPerformance>,
            $<mainReview>,
            $<personalGrade>,
            '{ $<classGradeDist:list> }',
            $<others> 
        ) RETURNING *;
    `;

    console.log(pgp.as.format(sql, data));
    return db.one(sql, data);
}

function edit(postId, data) {
    const sql = `
        UPDATE posts 
        SET semester = $<semester>,
            department = $<department>,
            course_subnumber = $<courseSubnumber>,
            title = $<title>,
            course_type = $<courseType>,
            sweet = $<sweet>,
            cool = $<cool>,
            recommend = $<recommend>,
            info = $<info>,
            prerequisite = $<prerequisite>,
            teach_method = $<teachMethod>,
            assignment = $<assignment>,
            exam = $<exam>,
            evaluation = $<evaluation>,
            textbook = $<textbook>,
            teacher_character = $<teacherCharacter>,
            ta_performance = $<taPerformance>,
            main_review = $<mainReview>,
            personal_grade = $<personalGrade>,
            class_grade_dist = '{ $<classGradeDist:list> }',
            others = $<others>,
            updated_at = current_timestamp
        WHERE id = $<postId>
        RETURNING *;
    `;

    console.log(pgp.as.format(sql, { ...data, postId }));
    return db.one(sql, { ...data, postId });
}

module.exports = { list, select, create, edit };
