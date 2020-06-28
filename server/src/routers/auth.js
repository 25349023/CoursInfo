const express = require("express");
const bodyParser = require("body-parser");
const accessController = require("../middlewares/access-controller.js");

const authStrategy = require("../auth/auth-strategy");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;

const router = express.Router();

router.use(bodyParser.json());
router.use(accessController); // Allows cross-origin HTTP requests

router.get(
    "/google",
    passport.authenticate("login", {
        scope: ["profile", "email"],
        prompt: "select_account",
    })
);

router.get(
    "/google/callback",
    passport.authenticate("login", { failureRedirect: "/login" }),
    function (req, res) {
        console.log(req.user);
        const [accessToken, refreshToken] = authStrategy.getJwtToken(req.user);

        res.status(200)
            .cookie("jwt", accessToken, {
                httpOnly: true,
                maxAge: 3600000,
                sameSite: "lax",
                secure: true,
            })
            .cookie("reftok", refreshToken, {
                httpOnly: true,
                maxAge: 604800000,
                sameSite: "lax",
                secure: true,
                path: "/auth",
            })
            .redirect("/");
    }
);

router.get("/check", function (req, res, next) {
    passport.authenticate("token", function (err, user, info) {
        if (req.query.fail) {
            res.send("auth failed");
        } else if (!user) {
            res.redirect(`/auth/refresh?redirect=${req.baseUrl}${req.path}`);
        } else {
            res.send("auth success");
        }
    })(req, res, next);
});

router.get("/logout", function (req, res, next) {
    res.status(200)
        .clearCookie("jwt", {
            httpOnly: true,
            sameSite: "lax",
            secure: true,
        })
        .clearCookie("reftok", {
            httpOnly: true,
            sameSite: "lax",
            secure: true,
            path: "/auth",
        })
        .redirect("/");
});

router.get("/refresh", function (req, res, next) {
    if (!req.cookies.reftok) {
        const err = new Error("you don't have refresh token");
        res.status(400).redirect(`${req.query.redirect}?fail=1`);
        return;
    }
    const payload = jwt.verify(req.cookies.reftok, secret_key);
    console.log(payload);

    if (checkRefreshExpired(payload)) {
        console.log("refresh refresh token");
        const newRefreshToken = authStrategy.genRefreshToken(payload);
        res.cookie("reftok", newRefreshToken, {
            httpOnly: true,
            maxAge: 604800000,
            sameSite: "lax",
            secure: true,
            path: "/auth",
        });
    }

    const newAccessToken = authStrategy.genAccessToken(payload);
    res.cookie("jwt", newAccessToken, {
        httpOnly: true,
        maxAge: 3600000,
        sameSite: "lax",
        secure: true,
    }).redirect(req.query.redirect);
});

function checkRefreshExpired(payload) {
    const currentTime = Math.floor(Date.now() / 1000);
    const halfDay = 43200;
    console.log(payload.exp - currentTime);
    return payload.exp - currentTime < halfDay;
}

module.exports = router;
