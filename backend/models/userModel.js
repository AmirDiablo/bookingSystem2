const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    googleId:{
        type: String,
    },
    avatar: { 
        type: String,
        default: "http://localhost:3000/uploads/profiles/default.png"
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user' 
    }
}, { timestamps: true })

userSchema.statics.signup = async function (username, email, password, role) {
    const check = await this.findOne({email: email})

    if(!username || !email || !password) {
        throw Error("all fields must be filled")
    }

    if(check) {
        throw Error("this email is already in use")
    }

    if(!validator.isLength(username, {min: 3, max:20})) {
        throw Error("firstname must be at least 3 chars and maximum of 20")
    }

    /* if(!validator.isEmail(email)) {
        throw Error("enter a valid email address")
    } */

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const account = await this.create({ username, email, password: hash, roles: role })

    return account
}

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email})

    if(!email || !password) {
        throw Error("all fields must be filled")
    }

    if(!user) {
        throw Error("incorrect email")
    }

    if(!validator.isEmail(email)) {
        throw Error("enter a valid email address")
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error("incorrect password")
    }

    return user
}

const User = mongoose.model('User', userSchema);

module.exports = User;