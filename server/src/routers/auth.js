const express = require("express");
const bodyParser = require("body-parser");
const accessController = require("../middlewares/access-controller.js");

const authStrategy = require("../auth/auth-strategy");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const usersModel = require("../models/users");
const SECRET_KEY = process.env.SECRET_KEY;

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
    function (req, res) {
        console.log(req.user);
        const [accessToken, refreshToken] = authStrategy.getJwtToken(req.user);
        usersModel.setRefreshToken({ userId: req.user.id, refreshToken });

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
        console.log(req.originalUrl);
        if (!user) {
            res.redirect(`/auth/refresh?redirect=${req.originalUrl}`);
        } else {
            res.send("auth success");
        }
    })(req, res, next);
});

router.get("/refresh", function (req, res, next) {
    if (!req.cookies.reftok) {
        const err = new Error("you don't have refresh token");
        err.status = 400;
        throw err;
    }
    const payload = jwt.verify(req.cookies.reftok, SECRET_KEY);
    console.log(payload);

    usersModel
        .getRefreshToken(payload.id)
        .then((token) => {
            console.log(token);

            if (token.refresh_token === req.cookies.reftok) {
                if (checkRefreshExpired(payload)) {
                    console.log("refresh refresh token");
                    const newRefreshToken = authStrategy.genRefreshToken(
                        payload
                    );
                    usersModel.setRefreshToken({
                        userId: payload.id,
                        refreshToken: newRefreshToken,
                    });
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
            } else {
                const err = new Error("your refresh token is not valid");
                err.status = 401;
                throw err;
            }
        })
        .catch(next);
});

function checkRefreshExpired(payload) {
    const currentTime = Math.floor(Date.now() / 1000);
    const halfDay = 43200;
    console.log(payload.exp - currentTime);
    return payload.exp - currentTime < halfDay;
}

module.exports = router;
