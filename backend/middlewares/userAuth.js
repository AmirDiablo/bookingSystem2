const jwt = require("jsonwebtoken")
const User = require("../models/userModel.js")

const requireAuth = async (req, res, next)=> {
    
    const { authorization } = req.headers

    
    if(!authorization) {
        return res.status(401).json({error: "Authorization tokrn required"})
    }

    const token = authorization.split(' ')[1]

    try{
        const { _id } = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({_id}).select('_id')
        next()
    }catch(error){
        res.status(401).json({error: "request is not authorized"})
    }
}

const adminAuth = async (req, res, next) => {
    try{
        const userId = req.user._id.toString()

        const user = await User.findOne({_id: userId})

        if(user.role !== "admin") {
            return res.json({success: false, message: "not authorized"})
        }

        next();
    } catch (error) {
        return res.json({success: false, message: "not authorized"})
    }

}

module.exports = {requireAuth, adminAuth}