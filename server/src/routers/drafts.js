const express = require("express");
const bodyParser = require("body-parser");
const accessController = require("../middlewares/access-controller.js");

const draftsModel = require("../models/drafts");
const { checkUser } = require("../utils");

const passport = require("passport");
const router = express.Router();

router.use(bodyParser.json());
router.use(accessController);

router.use(passport.authenticate("token"));

router.get("/user/:userId", function (req, res, next) {
    const { userId } = req.params;
    checkUser(userId, req);

    draftsModel
        .list(userId)
        .then((df) => {
            res.json(df);
        })
        .catch(next);
});

router.get("/:draftId", function (req, res, next) {
    let { draftId } = req.params;
    const { userId } = req.query;
    checkUser(userId, req);

    draftsModel
        .select(draftId, userId)
        .then((df) => {
            res.json(df);
        })
        .catch(next);
});

router.post("/", function (req, res, next) {
    const requiredFields = [
        "userId",
        "semester",
        "department",
        "courseSubnumber",
    ];
    const { userId } = req.body;
    checkUser(userId, req);

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

router.put("/:draftId", function (req, res, next) {
    const requiredFields = [
        "userId",
        "semester",
        "department",
        "courseSubnumber",
    ];
    let { draftId } = req.params;
    const { userId } = req.body;
    checkUser(userId, req);

    let err = null;

    for (let f of requiredFields) {
        if (!req.body.hasOwnProperty(f)) {
            err = new Error(`field ${f} is required`);
            err.status = 400;
            throw err;
        }
    }

    draftsModel
        .edit(draftId, userId, req.body)
        .then((df) => {
            res.json(df);
        })
        .catch(next);
});

router.delete("/:draftId", function (req, res, next) {
    const { userId } = req.body;
    checkUser(userId, req);
    let { draftId } = req.params;

    draftsModel
        .deleteDraft(draftId, userId)
        .then((df) => {
            res.json(df);
        })
        .catch(next);
});

module.exports = router;
