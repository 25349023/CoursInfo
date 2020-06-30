const express = require("express");
const bodyParser = require("body-parser");
const accessController = require("../middlewares/access-controller.js");

const ratingsModel = require("../models/ratings");
const { checkUser } = require("../utils");
const authStrategy = require("../auth/auth-strategy");

const passport = require("passport");
const router = express.Router();

router.use(bodyParser.json());
router.use(accessController);

router.use(authStrategy.retrieveNewToken);

router.get("/:userId/:semester-:department-:subnumber", function (
    req,
    res,
    next
) {
    const { userId } = req.params;
    const { semester, department, subnumber } = req.params;
    checkUser(userId, req);

    ratingsModel
        .select(userId, { semester, department, subnumber })
        .then((rat) => {
            res.json(rat);
        })
        .catch(next);
});

router.post("/", function (req, res, next) {
    const { userId } = req.body;
    checkUser(userId, req);

    ratingsModel
        .createOrEdit(userId, req.body)
        .then((rat) => {
            res.json(rat);
        })
        .catch(next);
});

module.exports = router;
