const passport = require("passport");
const passportJWT = require("passport-jwt");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

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
                    done(null, user);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    )
);
