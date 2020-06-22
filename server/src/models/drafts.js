const pgp = require("pg-promise")();
if (!global.db) {
    db = pgp(process.env.DB_URL);
}

function list(userId) {
    const sql = `
        SELECT pd.title, pd.updated_at, cs.course_chinese_title
        FROM post_drafts pd
            JOIN courses cs
            ON (cs.semester, cs.department, cs.course_subnumber) 
                = (pd.semester, pd.department, pd.course_subnumber)
        WHERE user_id = $<userId> 
            AND deleted_at IS NULL
        ORDER BY pd.updated_at DESC;
    `;

    return db.any(sql, { userId });
}

function create(data) {
    const optionalFields = [
        "title",
        "courseType",
        "sweet",
        "cool",
        "recommend",
        "info",
        "prerequisite",
        "teachMethod",
        "assignment",
        "exam",
        "evaluation",
        "textbook",
        "teacherCharacter",
        "taPerformance",
        "mainReview",
        "personalGrade",
        "classGradeDist",
        "others",
    ];

    for (let f of optionalFields) {
        if (!data.hasOwnProperty(f)) {
            data[f] = null;
        }
    }

    const sql = `
        UPDATE users SET draft_count = draft_count + 1
        WHERE id = $<userId>;    
        
        INSERT INTO post_drafts (user_id, semester, department, course_subnumber, title,
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

module.exports = { list, create };
