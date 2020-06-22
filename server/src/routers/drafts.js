const express = require("express");
const bodyParser = require("body-parser");
const accessController = require("../middlewares/access-controller.js");

const draftsModel = require("../models/drafts");

const router = express.Router();

router.use(bodyParser.json());
router.use(accessController);

router.get("/drafts/:userId", function (req, res, next) {
    const { userId } = req.params;
    draftsModel
        .list(userId)
        .then((df) => {
            res.json(df);
        })
        .catch(next);
});

router.post("/drafts", function (req, res, next) {
    const requiredFields = [
        "userId",
        "semester",
        "department",
        "courseSubnumber",
    ];

    let err = null;
    for (let f of requiredFields) {
        if (!req.body.hasOwnProperty(f)) {
            err = new Error(`field ${f} is required`);
            err.status = 400;
            throw err;
        }
    }

    draftsModel
        .create(req.body)
        .then((df) => {
            res.json(df);
        })
        .catch(next);
});

module.exports = router;
