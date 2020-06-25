const express = require("express");
const bodyParser = require("body-parser");
const accessController = require("../middlewares/access-controller.js");

const usersModel = require("../models/users");

const router = express.Router();

router.use(bodyParser.json());
router.use(accessController);

router.get("/users/:userId", function (req, res, next) {
    usersModel
        .select(req.params.userId)
        .then((user) => {
            res.json(user);
        })
        .catch(next);
});

router.post("/users", function (req, res, next) {
    usersModel
        .create(req.body)
        .then((user) => {
            res.json(user);
        })
        .catch(next);
});

module.exports = router;
