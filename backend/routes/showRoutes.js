const express = require("express")
const {getNowPlayingMovies, addShow, getShow, getShows} = require("../controllers/showControllers.js")
const { adminAuth, requireAuth } = require("../middlewares/userAuth.js")

const router = express.Router()

router.get("/now-playing", requireAuth, adminAuth, getNowPlayingMovies)
router.post("/add", requireAuth, adminAuth, addShow)
router.get("/all", getShows)
router.get("/:movieId", getShow)

module.exports = router