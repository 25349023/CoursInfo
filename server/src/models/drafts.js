const pgp = require("pg-promise")();
if (!global.db) {
    db = pgp(process.env.DB_URL);
}

function list(userId) {
    const sql = `
        SELECT pd.id, pd.title, pd.updated_at, cs.course_chinese_title
        FROM post_drafts pd
            JOIN courses cs
            ON (cs.semester, cs.department, cs.course_subnumber) 
                = (pd.semester, pd.department, pd.course_subnumber)
        WHERE user_id = $<userId> 
            AND deleted_at IS NULL
        ORDER BY pd.updated_at DESC
        LIMIT 5;
    `;

    return db.any(sql, { userId });
}

function select(draftId, userId) {
    const sql = `
        SELECT pd.*, cs.course_chinese_title, cs.teacher
        FROM post_drafts pd
            JOIN courses cs
            ON (cs.semester, cs.department, cs.course_subnumber) 
                = (pd.semester, pd.department, pd.course_subnumber)
        WHERE id = $<draftId> AND user_id = $<userId> 
            AND deleted_at IS NULL;
    `;

    return db.any(sql, { draftId, userId });
}

function create(data) {
    fillNull(data);

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

function edit(draftId, userId, data) {
    fillNull(data);

    const sql = `        
        UPDATE post_drafts 
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
        WHERE id = $<draftId> AND deleted_at IS NULL
        RETURNING *;
    `;

    console.log(pgp.as.format(sql, { ...data, draftId }));
    return checkUserDraft(draftId, userId).then(() => {
        return db.any(sql, { ...data, draftId });
    });
}

function deleteDraft(draftId, userId) {
    const sql = `
        UPDATE users SET draft_count = draft_count - 1
        WHERE id = $<userId>;    

        UPDATE post_drafts
        SET deleted_at = current_timestamp
        WHERE id = $<draftId> AND deleted_at IS NULL
        RETURNING id, deleted_at;
    `;

    return checkUserDraft(draftId, userId).then(() => {
        return db.any(sql, { draftId, userId });
    });
}

function checkUserDraft(draftId, userId) {
    const check = `
        SELECT id, user_id FROM post_drafts
        WHERE id = $<draftId> AND deleted_at IS NULL;
    `;
    const permissionDenied = 400;

    return db
        .one(check, { draftId })
        .then((draft) => {
            if (userId === draft.user_id) {
                return;
            } else {
                const err = new Error("you dont have permission to do this");
                err.code = permissionDenied;
                throw err;
            }
        })
        .catch((err) => {
            if (err.code === permissionDenied) {
                throw err;
            }
            throw new Error("no such draft");
        });
}

function fillNull(data) {
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
}

module.exports = { list, select, create, edit, deleteDraft };
