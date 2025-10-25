const express = require("express")
const {createBooking, getOccupiedSeats} = require("../controllers/bookingController.js")
const {requireAuth} = require("../middlewares/userAuth.js")

const router = express.Router()

router.post("/create", requireAuth, createBooking)
router.get("/seats/:showId", getOccupiedSeats)

module.exports = router