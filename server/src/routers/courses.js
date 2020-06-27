const express = require("express");
const bodyParser = require("body-parser");
const accessController = require("../middlewares/access-controller.js");

const courseModel = require("../models/courses");

const router = express.Router();

router.use(bodyParser.json());
router.use(accessController); // Allows cross-origin HTTP requests

router.get("/courses", function (req, res, next) {
    let { department, text, start, full } = req.query;
    let err = null;
    if (!department) {
        err = new Error("department is required");
    }
    if (start && start.length != 2) {
        err = new Error("length of start must be 0 or 2");
    }
    if (err) {
        err.status = 400;
        throw err;
    }

    full = full === "true" ? true : false;
    courseModel
        .list({ department, text, start, full })
        .then((cs) => {
            res.json(cs);
        })
        .catch(next);
});

router.get("/courses/:semester-:department-:courseSubnum", function (
    req,
    res,
    next
) {
    let { semester, department, courseSubnum } = req.params;
    if (!semester || !department || !courseSubnum) {
        const err = new Error("parameters are not enough");
        err.status = 400;
        throw err;
    }

    courseModel
        .select(req.params)
        .then((cs) => {
            res.json(cs);
        })
        .catch(next);
});

router.get("/courses/:semester-:department", function (req, res, next) {
    let { semester, department } = req.params;
    if (!semester || !department) {
        const err = new Error("parameters are not enough");
        err.status = 400;
        throw err;
    }

    courseModel
        .dropdownList(semester, department)
        .then((cs) => {
            res.json(cs);
        })
        .catch(next);
});

router.get("/courses/*", function (req, res, next) {
    const err = new Error("not found");
    err.status = 404;
    throw err;
});

module.exports = router;
