const express = require("express");
const bodyParser = require("body-parser");
const accessController = require("../middlewares/access-controller.js");

const postsModel = require("../models/posts");

const router = express.Router();

router.use(bodyParser.json());
router.use(accessController); // Allows cross-origin HTTP requests

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

module.exports = router;
