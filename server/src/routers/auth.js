const express = require("express");
const bodyParser = require("body-parser");
const accessController = require("../middlewares/access-controller.js");

const authStrategy = require("../auth/auth-strategy");
const passport = require("passport");

const router = express.Router();

router.use(bodyParser.json());
router.use(accessController); // Allows cross-origin HTTP requests

router.get(
    "/google",
    passport.authenticate("login", {
        scope: ["profile", "email"],
    })
);

router.get(
    "/google/callback",
    passport.authenticate("login", { failureRedirect: "/login" }),
    function (req, res, next) {
        console.log(req.user);
        res.send(`hi how are you ${req.user.nickname}`);
    }
);

module.exports = router;
