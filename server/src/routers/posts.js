const express = require("express");
const bodyParser = require("body-parser");
const accessController = require("../middlewares/access-controller.js");

const postsModel = require("../models/posts");
const { checkUser } = require("../utils");

const passport = require("passport");
const router = express.Router();

router.use(bodyParser.json());
router.use(accessController);

router.get("/", function (req, res, next) {
    let { department, text, start } = req.query;
    let err = null;
    if (!department) {
        err = new Error("department is required");
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

router.get("/:department-:subnumber", function (req, res, next) {
    let { department, subnumber } = req.params;

    postsModel
        .simpleList(department, subnumber)
        .then((posts) => {
            res.json(posts);
        })
        .catch(next);
});

router.get("/:postId", function (req, res, next) {
    let { postId } = req.params;

    postsModel
        .select(postId)
        .then((post) => {
            res.json(post);
        })
        .catch(next);
});

router.post("/", passport.authenticate("token"), function (req, res, next) {
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

    checkUser(req.body.userId, req);

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

router.put("/:postId", passport.authenticate("token"), function (
    req,
    res,
    next
) {
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
    checkUser(userId, req);

    let err = null;
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

router.delete("/:postId", passport.authenticate("token"), function (
    req,
    res,
    next
) {
    const { userId } = req.body;
    let { postId } = req.params;
    checkUser(userId, req);

    postsModel
        .deletePost(postId, userId)
        .then((info) => {
            res.json(info);
        })
        .catch(next);
});

router.post("/:postId/like", passport.authenticate("token"), function (
    req,
    res,
    next
) {
    let { postId } = req.params;
    let { userId } = req.body;
    checkUser(userId, req);

    postsModel
        .voteLike(userId, postId)
        .then((data) => {
            res.json(data);
        })
        .catch(next);
});

router.post("/:postId/dislike", passport.authenticate("token"), function (
    req,
    res,
    next
) {
    let { postId } = req.params;
    let { userId } = req.body;
    checkUser(userId, req);

    postsModel
        .voteDislike(userId, postId)
        .then((data) => {
            res.json(data);
        })
        .catch(next);
});

router.post("/:postId/cancelVote", passport.authenticate("token"), function (
    req,
    res,
    next
) {
    let { postId } = req.params;
    let { userId } = req.body;
    checkUser(userId, req);

    postsModel
        .voteCancel(userId, postId)
        .then((data) => {
            res.json(data);
        })
        .catch(next);
});

module.exports = router;
