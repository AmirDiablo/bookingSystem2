const express = require('express');
const router = express.Router();
const uplaodProfile = require("../uploadProfile")
const {requireAuth} = require("../middlewares/userAuth.js")
const {signup, userLogin, userInfo, continueWithGoogle, updateFavorite, getFavorites, getUserBookings, editProfile} = require("../controllers/userController.js")

router.post("/signup", signup)
router.post("/login", userLogin)
router.post("/googleSign", continueWithGoogle)
router.get("/userInfo", userInfo)
router.post("/update-favorite", requireAuth, updateFavorite)
router.get("/favorites", requireAuth, getFavorites)
router.get("/bookings", requireAuth, getUserBookings)
router.patch("/editProfile", uplaodProfile.single("profile"), requireAuth, editProfile)

module.exports = router