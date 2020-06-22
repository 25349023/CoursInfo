require("../config.js");
const express = require("express");

const coursesRouter = require("./routers/courses");
const postsRouter = require("./routers/posts");
// const requestLogger = require("./middlewares/requests-logger");
const errorHandler = require("./middlewares/error-handler.js");

const app = express();
const port = 3000;

// app.use(requestLogger);

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/api", coursesRouter, postsRouter);
app.get("/*", (req, res) => res.redirect("/"));

app.use(errorHandler);

app.listen(port, () =>
    console.log(`Server is up and running on port ${port}...`)
);
