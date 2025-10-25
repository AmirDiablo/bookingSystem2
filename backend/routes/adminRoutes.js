const express = require("express")
const {isAdmin, getAllShows, getDashboardData, getAllBookings} = require("../controllers/adminController.js")
const {adminAuth, requireAuth} = require("../middlewares/userAuth.js")

const router = express.Router()

router.get("/is-admin", requireAuth, adminAuth, isAdmin)
router.get("/dashboard", requireAuth, adminAuth, getDashboardData)
router.get("/all-shows", requireAuth, adminAuth, getAllShows)
router.get("/all-bookings", adminAuth, getAllBookings)

module.exports = router