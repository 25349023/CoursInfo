const express = require("express");
const bodyParser = require("body-parser");
const accessController = require("../middlewares/access-controller.js");

const coursesRouter = require("./courses");
const postsRouter = require("./posts");
const draftsRouter = require("./drafts");
const usersRouter = require("./users");

const router = express.Router();

router.use(bodyParser.json());
router.use(accessController); // Allows cross-origin HTTP requests

router.use("/courses", coursesRouter);
router.use("/posts", postsRouter);
router.use("/drafts", draftsRouter);
router.use("/users", usersRouter);

router.get("/*", (req, res) => {
    console.log("hello here");
    const err = new Error("api not found");
    err.status = 404;
    throw err;
});

module.exports = router;
