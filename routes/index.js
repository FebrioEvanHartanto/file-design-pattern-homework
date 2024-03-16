const express = require("express");
const router = express.Router();
const movieRouter = require("./movieRoute.js")
const userRouter = require("./userRoute.js")
const path = require("path");


router.use("/api/images", express.static(path.join(__dirname, "../uploads")))
router.use("/api/movies", movieRouter)
router.use("/api/users", userRouter)

module.exports = router;
