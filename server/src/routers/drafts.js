const express = require("express");
const bodyParser = require("body-parser");
const accessController = require("../middlewares/access-controller.js");

const draftsModel = require("../models/drafts");

const router = express.Router();

router.use(bodyParser.json());
router.use(accessController);

router.get("/drafts/user/:userId", function (req, res, next) {
    const { userId } = req.params;
    draftsModel
        .list(userId)
        .then((df) => {
            res.json(df);
        })
        .catch(next);
});

router.get("/drafts/:draftId", function (req, res, next) {
    let { draftId } = req.params;
    draftId = Number(draftId);

    if (isNaN(draftId)) {
        let err = new Error(`id must be number`);
        err.status = 400;
        throw err;
    }

    draftsModel
        .select(draftId)
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

router.put("/drafts/:draftId", function (req, res, next) {
    const requiredFields = [
        "userId",
        "semester",
        "department",
        "courseSubnumber",
    ];

    let { draftId } = req.params;
    draftId = Number(draftId);

    let err = null;
    if (isNaN(draftId)) {
        err = new Error(`id must be number`);
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

    draftsModel
        .edit(draftId, req.body)
        .then((df) => {
            res.json(df);
        })
        .catch(next);
});

module.exports = router;
