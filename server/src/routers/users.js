const express = require("express");
const bodyParser = require("body-parser");
const accessController = require("../middlewares/access-controller.js");

const usersModel = require("../models/users");
const { checkUser } = require("../utils");

const passport = require("passport");

const router = express.Router();

router.use(bodyParser.json());
router.use(accessController);

router.use(passport.authenticate("token"));

router.get("/current", function (req, res, next) {
    usersModel
        .select(req.user)
        .then((user) => {
            res.json(user);
        })
        .catch(next);
});

router.get("/:userId", function (req, res, next) {
    const { userId } = req.params;
    checkUser(userId, req);

    usersModel
        .select(req.params.userId)
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
