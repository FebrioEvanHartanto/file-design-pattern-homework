const express = require("express")
const router = express.Router();
const MovieController = require("../controllers/movieController.js")
const multer = require("../middlewares/multer.js")

router.get("/", MovieController.findAllMovies);
router.get("/:id", MovieController.findMovieById);
router.post("/", MovieController.createMovie);
router.post("/:id", multer, MovieController.uploads)
router.put("/:id", MovieController.updateMovie);
router.delete("/:id", MovieController.deleteMovie);

module.exports = router;