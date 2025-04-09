const express = require('express');
const { loginUser, registerUser, deleteUser } = require('../controllers/auth.js');
const authMiddleware = require('../middleware/auth.js');
const router = express.Router();

router.post('/login', loginUser)
    .post('/register', registerUser)
    .delete('/delete/:id', authMiddleware, deleteUser)

module.exports = router