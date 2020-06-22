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

    full = full == "true" ? true : false;
    courseModel
        .list({ department, text, start, full })
        .then((cs) => {
            res.json(cs);
        })
        .catch(next);
});

router.get("/courses/:semester-:department-:course_subnum", function (
    req,
    res,
    next
) {
    let { semester, department, course_subnum } = req.params;
    let err = null;

    if (err) {
        err.status = 400;
        throw err;
    }

    courseModel
        .select({ semester, department, course_subnum })
        .then((cs) => {
            res.json(cs);
        })
        .catch(next);
});

module.exports = router;
