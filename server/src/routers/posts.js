const express = require("express");
const bodyParser = require("body-parser");
const accessController = require("../middlewares/access-controller.js");

const postsModel = require("../models/posts");

const router = express.Router();

router.use(bodyParser.json());
router.use(accessController);

router.get("/posts", function (req, res, next) {
    let { department, text, start } = req.query;
    let err = null;
    if (!department) {
        err = new Error("department is required");
    }
    if (start) {
        start = Number(start);
        if (isNaN(start)) {
            err = new Error("start must be number");
        }
    }
    if (err) {
        err.status = 400;
        throw err;
    }

    postsModel
        .list({ department, text, start })
        .then((ps) => {
            res.json(ps);
        })
        .catch(next);
});

router.get("/posts/:postId", function (req, res, next) {
    let { postId } = req.params;
    let err = null;

    if (postId) {
        postId = Number(postId);
        if (isNaN(postId)) {
            err = new Error("start must be number");
        }
    }

    if (err) {
        err.status = 400;
        throw err;
    }

    postsModel
        .select(postId)
        .then((post) => {
            res.json(post);
        })
        .catch(next);
});

router.post("/posts", function (req, res, next) {
    const requiredFields = [
        "userId",
        "semester",
        "department",
        "courseSubnumber",
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
    let err = null;
    for (let f of requiredFields) {
        if (!req.body.hasOwnProperty(f)) {
            err = new Error(`field ${f} is required`);
            err.status = 400;
            throw err;
        }
    }

    postsModel
        .create(req.body)
        .then((post) => {
            res.json(post);
        })
        .catch(next);
});

router.put("/posts/:postId", function (req, res, next) {
    const requiredFields = [
        "semester",
        "department",
        "courseSubnumber",
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

    const { userId } = req.body;
    let { postId } = req.params;
    postId = Number(postId);

    let err = null;
    if (isNaN(postId)) {
        err = new Error(`id must be a number`);
        err.status = 400;
        throw err;
    }
    for (let f of requiredFields) {
        if (!req.body.hasOwnProperty(f)) {
            err = new Error(`field ${f} is required`);
            err.status = 400;
            throw err;
        }
    }

    postsModel
        .edit(postId, userId, req.body)
        .then((post) => {
            res.json(post);
        })
        .catch(next);
});

router.delete("/posts/:postId", function (req, res, next) {
    const { userId } = req.body;
    let { postId } = req.params;
    postId = Number(postId);

    let err = null;
    if (isNaN(postId)) {
        err = new Error(`id must be a number`);
    }
    if (err) {
        err.status = 400;
        throw err;
    }

    postsModel
        .deletePost(postId, userId)
        .then((info) => {
            res.json(info);
        })
        .catch(next);
});

router.post("/posts/:postId/like", function (req, res, next) {
    let { postId } = req.params;
    let { userId } = req.body;

    postsModel
        .voteLike(userId, postId)
        .then((data) => {
            res.json(data);
        })
        .catch(next);
});

router.post("/posts/:postId/dislike", function (req, res, next) {
    let { postId } = req.params;
    let { userId } = req.body;

    postsModel
        .voteDislike(userId, postId)
        .then((data) => {
            res.json(data);
        })
        .catch(next);
});

router.post("/posts/:postId/cancelVote", function (req, res, next) {
    let { postId } = req.params;
    let { userId } = req.body;

    postsModel
        .voteCancel(userId, postId)
        .then((data) => {
            res.json(data);
        })
        .catch(next);
});

module.exports = router;
