require("../config.js");
const express = require("express");
const passport = require("passport");

const coursesRouter = require("./routers/courses");
const postsRouter = require("./routers/posts");
const draftsRouter = require("./routers/drafts");
const usersRouter = require("./routers/users");
const authRouter = require("./routers/auth");
// const requestLogger = require("./middlewares/requests-logger");
const errorHandler = require("./middlewares/error-handler.js");

const app = express();
const port = 3000;

// app.use(requestLogger);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/auth", authRouter);
app.use("/api", coursesRouter, postsRouter, draftsRouter, usersRouter);
app.get("/*", (req, res) => res.redirect("/"));

app.use(errorHandler);

app.listen(port, () =>
    console.log(`Server is up and running on port ${port}...`)
);
