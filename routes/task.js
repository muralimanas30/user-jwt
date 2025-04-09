const express = require('express');
const { loginUser, registerUser, deleteUser } = require('../controllers/auth.js')
const router = express.Router();

router.post('/login', loginUser)
    .post('/register', registerUser)
    .delete('/delete', deleteUser)

module.exports = router