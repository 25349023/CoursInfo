const express = require("express");
const bodyParser = require("body-parser");
const accessController = require("../middlewares/access-controller.js");

const postsModel = require("../models/posts");
const utils = require("../utils");
const authStrategy = require("../auth/auth-strategy");

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

router.get("/users/:userId", function (req, res, next) {
    let { userId } = req.params;

    postsModel
        .listByUser(userId)
        .then((posts) => {
            res.json(posts);
        })
        .catch(next);
});

router.post("/", authStrategy.retrieveNewToken, function (req, res, next) {
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

    utils.checkUser(req.body.userId, req);

    let err = null;
    for (let f of requiredFields) {
        if (!req.body.hasOwnProperty(f)) {
            err = new Error(`field ${f} is required`);
            err.status = 400;
            throw err;
        }
    }

    const data = utils.sanitize(req.body);

    postsModel
        .create(data)
        .then((post) => {
            res.json(post);
        })
        .catch(next);
});

router.put("/:postId", authStrategy.retrieveNewToken, function (
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
    utils.checkUser(userId, req);

    let err = null;
    for (let f of requiredFields) {
        if (!req.body.hasOwnProperty(f)) {
            err = new Error(`field ${f} is required`);
            err.status = 400;
            throw err;
        }
    }

    const data = utils.sanitize(req.body);

    postsModel
        .edit(postId, userId, data)
        .then((post) => {
            res.json(post);
        })
        .catch(next);
});

router.delete("/:postId", authStrategy.retrieveNewToken, function (
    req,
    res,
    next
) {
    const { userId } = req.body;
    let { postId } = req.params;
    utils.checkUser(userId, req);

    postsModel
        .deletePost(postId, userId)
        .then((info) => {
            res.json(info);
        })
        .catch(next);
});

router.post("/:postId/like", authStrategy.retrieveNewToken, function (
    req,
    res,
    next
) {
    let { postId } = req.params;
    let { userId } = req.body;
    utils.checkUser(userId, req);

    postsModel
        .voteLike(userId, postId)
        .then((data) => {
            res.json(data);
        })
        .catch(next);
});

router.get("/:postId-:userId/vote", authStrategy.retrieveNewToken, function (
    req,
    res,
    next
) {
    let { postId, userId } = req.params;
    utils.checkUser(userId, req);

    postsModel
        .getUserVote(userId, postId)
        .then((vote) => {
            res.json(vote);
        })
        .catch((err) => {
            res.json({});
        });
});

router.post("/:postId/dislike", authStrategy.retrieveNewToken, function (
    req,
    res,
    next
) {
    let { postId } = req.params;
    let { userId } = req.body;
    utils.checkUser(userId, req);

    postsModel
        .voteDislike(userId, postId)
        .then((data) => {
            res.json(data);
        })
        .catch(next);
});

router.post("/:postId/cancelVote", authStrategy.retrieveNewToken, function (
    req,
    res,
    next
) {
    let { postId } = req.params;
    let { userId } = req.body;
    utils.checkUser(userId, req);

    postsModel
        .voteCancel(userId, postId)
        .then((data) => {
            res.json(data);
        })
        .catch(next);
});

module.exports = router;
