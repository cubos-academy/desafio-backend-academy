const express = require('express');
const registerUser = require('./controllers/users');

const router = express();
router.post('/usuario', registerUser);

module.exports = router