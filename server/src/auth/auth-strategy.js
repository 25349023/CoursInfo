const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const jwt = require("jsonwebtoken");

const secret_key = process.env.SECRET_KEY;
const client_id = process.env.GOOGLE_CLIENT_ID;
const client_secret = process.env.GOOGLE_CLIENT_SECRET;

const usersModel = require("../models/users");

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(
    "login",
    new GoogleStrategy(
        {
            clientID: client_id,
            clientSecret: client_secret,
            callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
        },
        function (accessToken, refreshToken, profile, done) {
            console.log(accessToken);
            console.log(refreshToken);
            console.log(profile);
            usersModel
                .selectOrCreate({
                    email: profile._json.email,
                    nickname: profile.displayName,
                })
                .then((user) => {
                    done(null, {
                        id: user.id,
                        email: user.email,
                        pid: profile.id,
                    });
                })
                .catch((err) => {
                    console.log(err);
                    done(err);
                });
        }
    )
);

passport.use(
    "token",
    new JWTStrategy(
        {
            secretOrKey: secret_key,
            jwtFromRequest: cookieExtractor("jwt"),
        },
        function (jwtPayload, done) {
            console.log("jwtpayload: ");
            console.log(jwtPayload);
            done(null, jwtPayload.id);
        }
    )
);

function cookieExtractor(cookieName) {
    return function (req) {
        var token = null;
        if (req && req.cookies) {
            token = req.cookies[cookieName];
        }
        return token;
    };
}

function getJwtToken(user) {
    const accToken = genAccessToken(user);
    const refToken = genRefreshToken(user);
    return [accToken, refToken];
}

function genAccessToken(user) {
    return jwt.sign({ pid: user.pid, id: user.id }, secret_key, {
        expiresIn: "1 hour",
    });
}

function genRefreshToken(user) {
    return jwt.sign(
        { pid: user.pid, id: user.id, email: user.email },
        secret_key,
        {
            expiresIn: "7 days",
        }
    );
}

module.exports = { getJwtToken, genAccessToken, genRefreshToken };
