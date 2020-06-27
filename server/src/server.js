require("../config.js");
const express = require("express");
const passport = require("passport");
const http = require("http");
const https = require("https");
const fs = require("fs");

const apiRouter = require("./routers/api");
const authRouter = require("./routers/auth");
const requestLogger = require("./middlewares/requests-logger");
const errorHandler = require("./middlewares/error-handler.js");
const cookieParser = require("cookie-parser");

const app = express();
const httpsPort = 3000,
    httpPort = 3001;

app.use(requestLogger);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));

// app.use(function (req, res, next) {
//     console.log(req.protocol);
//     if (req.headers["x-forwarded-proto"] === "https") {
//         return next();
//     }
//     res.redirect("https://" + req.hostname + req.url);
// });

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/api", apiRouter);
app.use("/auth", authRouter);

app.get("/*", (req, res) => res.redirect("/"));

app.use(errorHandler);

app.listen(httpsPort, () =>
    console.log(`Server is up and running on port ${httpsPort}...`)
);

// const privateKey = fs.readFileSync("src/localhost.key", "utf8");
// const certificate = fs.readFileSync("src/localhost.crt", "utf8");

// const credentials = { key: privateKey, cert: certificate };

// const httpsServer = https.createServer(credentials, app);
// httpsServer.listen(httpsPort, () =>
//     console.log(`Server is up and running on Port ${httpsPort}...`)
// );

// const httpServer = http.createServer(app);
// httpServer;
