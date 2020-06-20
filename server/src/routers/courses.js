const express = require("express");
const bodyParser = require("body-parser");
const accessController = require("../middlewares/access-controller.js");

const courseModel = require("../models/courses");

const router = express.Router();

router.use(bodyParser.json());
router.use(accessController); // Allows cross-origin HTTP requests

router.get("/courses", function (req, res, next) {
    const { department, text, start } = req.query;
    const err = null;
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

    courseModel
        .list({ department, text, start })
        .then((cs) => {
            res.json(cs);
        })
        .catch(next);
});

module.exports = router;
