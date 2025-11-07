const User = require("../models/userModel.js")
const jwt = require("jsonwebtoken")
const validator = require("validator")
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const Booking = require("../models/BookingModel.js")
const Favorite = require("../models/FavoriteModel.js")
const Movie = require("../models/MovieModel.js")
const fs = require("fs")
const path = require("path")

// create token
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: "3d"})
}

const trimer = (value)=> {
    return validator.trim(validator.escape(value).replace(" ", ""))
}

const signup = async (req, res)=> {
    const {username, email, password} = req.body
    const newUsername = validator.trim(username)
    const newEmail = trimer(email)
    const newPassword = trimer(password)

    try{
        const account = await User.signup(newUsername, newEmail, newPassword)
        const token = createToken(account._id)
        res.status(200).json({id: account._id , token})
    }catch(error){
        res.status(400).json({ error: error.message })
    }
}

const userLogin = async(req, res)=> {
    const { email, password } = req.body
    const newEmail = trimer(email)
    const newPassword = trimer(password)

    try{
        const account = await User.login(newEmail, newPassword)

        const token = createToken(account._id)

        res.status(200).json({id: account._id, token})
    }catch(error){
        res.status(400).json({ error: error.message })
    }
}

const continueWithGoogle = async(req, res)=> {
    const {googleId, username, email} = req.body
    const check = await User.findOne({email})
    let user;

    try{
        //login
        if(check) {
            user = check
        }else{
            const account = await User.create({username, email, googleId}) 
            user = account
        }

        const token = createToken(user._id)
        res.status(200).json({id: user._id, token})
    }catch(err) {
        res.status(500).json({error: err.message})
    }
}

const userInfo = async(req, res)=> {
    const id = req.query.q
    try{
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("No such user")
        }

        const userInfo = await User.find({_id: id})
        res.status(200).json(userInfo)
    }
    catch(err) {
        res.status(404).json({error: err.message})
    }
}

const editProfile = async (req, res)=> {
    const userId = req.user._id.toString();
    const { name } = req.body;

    try {
        let updatedFields = { username: name };

        // اگر فایل جدید آپلود شده باشه، عکس جدید رو اضافه کن
        if (req.file) {
            updatedFields.avatar = `http://localhost:3000/uploads/profiles/${req.file.filename}`;
            

            // عکس قبلی رو حذف کن
            const currentProfile = await User.findById(userId).select("avatar");
            if (currentProfile?.avatar) {
                const avatarUrl = currentProfile.avatar;
                const filename = path.basename(avatarUrl); // فقط نام فایل رو جدا می‌کنه
                const oldProfilePath = path.join(__dirname, "../uploads/profiles", filename);
                console.log(oldProfilePath)
                if (fs.existsSync(oldProfilePath)) {
                    console.log("ok")
                    fs.unlink(oldProfilePath, (err) => {
                        if (err) console.log("Error deleting old profile:", err);
                        else console.log("Old profile deleted successfully");
                    });
                }
            }
        }

        const profilePhoto = await User.findByIdAndUpdate(
            userId,
            { $set: updatedFields },
            { new: true }
        );

        res.status(200).json(profilePhoto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUserBookings = async (req, res) => {
    try{
        const user = req.user._id

        const bookings = await Booking.find({user}).populate({
            path: 'show',
            populate: {
                path: "movie"
            }
        }).sort({createdAt: -1})

        res.json({success: true, bookings})
    } catch (error) {
        console.error(error)
        res.json({success: false, message: error.message})
    }
}

const updateFavorite = async (req, res) => {
    try{
        const {movieId} = req.body
        const userId = req.user._id

        const isExists = await Favorite.findOne({movieId, userId})

        if(!isExists) {
            const addToFav = await Favorite.create({userId, movieId})
        }

        if(isExists) {
            const deleteFav = await Favorite.deleteOne({userId, movieId})
        }

        res.json({success: true, message: "The Movie added"})

    } catch (error) {
        console.error(error)
        res.json({success: false, message: error.message})
    }
}

const getFavorites = async (req, res) => {
    try{
        const userId = req.user._id

        const favoritesWithMovies = await Favorite.aggregate([
            {
                $match: { userId: userId }
            },
            {
                $lookup: {
                    from: "movies", // نام کالکشن movies
                    localField: "movieId",
                    foreignField: "_id",
                    as: "movie"
                }
            },
            {
                $unwind: "$movie"
            },
            {
                $replaceRoot: { newRoot: "$movie" }
            }
        ]);

        res.json({success: true, favoritesWithMovies})
    } catch (error) {
        console.error(error)
        res.json(error.message)
    }
}

module.exports = {signup, userLogin, userInfo, continueWithGoogle, getUserBookings, updateFavorite, getFavorites, editProfile}