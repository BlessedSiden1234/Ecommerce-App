const {signInUser, signupUser} = require('../controllers/access');
const express = require('express');
const router2 = express.Router()


router2.route('/signin').post(signInUser)
router2.route('/signup').post(signupUser)

module.exports = router2