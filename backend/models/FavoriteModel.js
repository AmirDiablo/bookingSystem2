const mongoose = require("mongoose")

const favoriteSchema = new mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, ref: "User", required: true},
    movieId: {type: String, required: true},
}, {timestamps: true})

const Favorite = mongoose.model("Favorite", favoriteSchema)

module.exports = Favorite