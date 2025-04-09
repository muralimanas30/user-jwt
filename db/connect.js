const mongoose = require('mongoose');
require('dotenv').config()
module.exports = connectDb = () => new Promise(async (res, rej) => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        return res();
    } catch (error) {
        return rej(error);
    }
})