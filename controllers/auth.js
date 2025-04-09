const http_status_codes = require('http-status-codes');
const User = require('../models/User');
const jwt = require('jsonwebtoken')

require('dotenv').config();

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(http_status_codes.BAD_REQUEST).json({ msg: "Email and Pass required" })

    const user = await User.findOne({ email });
    if (!user || password != user.password)
        return res.status(http_status_codes.UNAUTHORIZED).json({ msg: "Email or Pass invalid" })

    const token = jwt.sign({_id:user._id,email:user.email}, process.env.JWT_SECRET);
    return res.status(http_status_codes.OK).json({ msg: "Success", token })
}
const registerUser = async (req, res, next) => {
    const { email, name, password } = req.body
    if (!email || !password || !name) return res.status(http_status_codes.BAD_REQUEST).json({ msg: "all are required" })

    const user = await User.findOne({ email });
    console.log(email);
    if (user){
        console.log(user);
        return res.status(http_status_codes.BAD_REQUEST).json({ msg: "Email already in use" })
    }
    const newUser = await User.create(req.body)
    
    const token = jwt.sign({_id:newUser._id,email:newUser.email}, process.env.JWT_SECRET);
    return res.status(http_status_codes.OK).json({ msg: "Success", token })
}
const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
        await User.findByIdAndDelete(id);
        return res.status(http_status_codes.OK).json({ msg: "Success" })
    }
    return res.status(http_status_codes.NOT_FOUND).json({ msg: "FAIL" })
}

module.exports = { loginUser, registerUser, deleteUser };