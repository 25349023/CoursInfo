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
        "us.nickname",
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
            JOIN users us
            ON ps.user_id = us.id
        WHERE ps.deleted_at IS NULL AND
            ${queries.join(" AND ")}
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
        WHERE ps.id = $<postId> AND deleted_at IS NULL;
    `;

    console.log(pgp.as.format(sql, { postId }));
    return db.any(sql, { postId });
}

function create(data) {
    const sql = `
        UPDATE users 
        SET daily_publish_count = daily_publish_count + 1
        WHERE id = $<userId>;    

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

function edit(postId, userId, data) {
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
        WHERE id = $<postId> AND user_id = $<userId> AND deleted_at IS NULL
        RETURNING *;
    `;

    return checkUserPost(postId, userId).then(() => {
        console.log(pgp.as.format(sql, { ...data, postId, userId }));
        return db.any(sql, { ...data, postId, userId });
    });
}

function deletePost(postId, userId) {
    const sql = `
        UPDATE posts
        SET deleted_at = current_timestamp
        WHERE id = $<postId> AND deleted_at IS NULL
        RETURNING id, deleted_at;
    `;

    return checkUserPost(postId, userId).then(() => {
        return db.any(sql, { postId });
    });
}

function checkUserPost(postId, userId) {
    const check = `
        SELECT id, user_id FROM posts
        WHERE id = $<postId> AND deleted_at IS NULL;
    `;
    const permissionDenied = 400;

    return db
        .one(check, { postId })
        .then((post) => {
            if (userId == post.user_id) {
                return;
            } else {
                const err = new Error("you dont have permission to do this");
                err.code = permissionDenied;
                throw err;
            }
        })
        .catch((err) => {
            if (err.code == permissionDenied) {
                throw err;
            }
            throw new Error("no such post");
        });
}

function voteLike(userId, postId) {
    const succSql = `
        UPDATE post_votes
        SET upvote = true
        WHERE user_id = $<userId> AND post_id = $<postId>;

        UPDATE posts
        SET dislikes = dislikes - 1
        WHERE id = $<postId> AND deleted_at IS NULL;
    `;
    const fail_Sql = `
        INSERT INTO post_votes (user_id, post_id, upvote)
        VALUES ($<userId>, $<postId>, true);
    `;
    const baseSql = `
        UPDATE posts
        SET likes = likes + 1
        WHERE id = $<postId> AND deleted_at IS NULL
        RETURNING *;    
    `;
    const originSql = `
        SELECT * FROM posts
        WHERE id = $<postId> AND deleted_at IS NULL;
    `;

    return getUserVote(userId, postId)
        .then((data) => {
            if (!data.upvote) {
                console.log("update existing vote");
                const sql = succSql + baseSql;
                return db.any(sql, { userId, postId });
            } else {
                console.log("no op");
                return db.any(originSql, { userId, postId });
            }
        })
        .catch((err) => {
            console.log("create new vote");
            const sql = fail_Sql + baseSql;
            return db.any(sql, { userId, postId });
        });
}

function voteDislike(userId, postId) {
    const succSql = `
        UPDATE post_votes
        SET upvote = false
        WHERE user_id = $<userId> AND post_id = $<postId>;

        UPDATE posts
        SET likes = likes - 1
        WHERE id = $<postId> AND deleted_at IS NULL;
    `;
    const failSql = `
        INSERT INTO post_votes (user_id, post_id, upvote)
        VALUES ($<userId>, $<postId>, false);
    `;
    const baseSql = `
        UPDATE posts
        SET dislikes = dislikes + 1
        WHERE id = $<postId> AND deleted_at IS NULL
        RETURNING *;    
    `;
    const originSql = `
        SELECT * FROM posts
        WHERE id = $<postId> AND deleted_at IS NULL;
    `;

    return getUserVote(userId, postId)
        .then((data) => {
            if (data.upvote) {
                console.log("update existing vote");
                const sql = succSql + baseSql;
                return db.any(sql, { userId, postId });
            } else {
                console.log("no op");
                return db.any(originSql, { userId, postId });
            }
        })
        .catch((err) => {
            console.log("create new vote");
            const sql = failSql + baseSql;
            return db.any(sql, { userId, postId });
        });
}

function voteCancel(userId, postId) {
    const deleteVote = `
        DELETE FROM post_votes 
        WHERE user_id = $<userId> AND post_id = $<postId>;
    `;
    const cancelLike = `
        UPDATE posts
        SET likes = likes - 1
        WHERE id = $<postId> AND deleted_at IS NULL
        RETURNING *;    
    `;
    const cancelDislike = `
        UPDATE posts
        SET dislikes = dislikes - 1
        WHERE id = $<postId> AND deleted_at IS NULL
        RETURNING *;    
    `;
    const originSql = `
        SELECT * FROM posts
        WHERE id = $<postId> AND deleted_at IS NULL;
    `;

    return getUserVote(userId, postId)
        .then((data) => {
            if (data.upvote) {
                const sql = deleteVote + cancelLike;
                return db.any(sql, { userId, postId });
            } else {
                const sql = deleteVote + cancelDislike;
                return db.any(sql, { userId, postId });
            }
        })
        .catch((err) => {
            return db.any(originSql, { userId, postId });
        });
}

function getUserVote(userId, postId) {
    const sql = `
        SELECT * FROM post_votes
        WHERE (user_id, post_id) = ($<userId>, $<postId>);
    `;

    return db.one(sql, { userId, postId });
}

module.exports = {
    list,
    select,
    create,
    edit,
    deletePost,
    voteLike,
    voteDislike,
    voteCancel,
};
