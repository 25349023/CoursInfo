const express = require("express");
const bodyParser = require("body-parser");
const accessController = require("../middlewares/access-controller.js");

const usersModel = require("../models/users");
const { checkUser } = require("../utils");

const passport = require("passport");

const router = express.Router();

router.use(bodyParser.json());
router.use(accessController);

// router.use(passport.authenticate("token"));

router.get("/current", passport.authenticate("token"), function (
    req,
    res,
    next
) {
    usersModel
        .select(req.user)
        .then((user) => {
            res.json(user);
        })
        .catch(next);
});

router.get("/:userId", passport.authenticate("token"), function (
    req,
    res,
    next
) {
    const { userId } = req.params;
    checkUser(userId, req);

    usersModel
        .select(req.params.userId)
        .then((user) => {
            res.json(user);
        })
        .catch(next);
});

router.post("/nickname", passport.authenticate("token"), function (
    req,
    res,
    next
) {
    const { userId, nickname } = req.body;
    checkUser(userId, req);

    usersModel
        .changeName(userId, nickname)
        .then((user) => {
            res.json(user);
        })
        .catch(next);
});

// router.post("/users", function (req, res, next) {
//     usersModel
//         .create(req.body)
//         .then((user) => {
//             res.json(user);
//         })
//         .catch(next);
// });

module.exports = router;
