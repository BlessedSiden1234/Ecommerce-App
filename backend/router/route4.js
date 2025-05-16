const express = require('express')
const route4 = express.Router()
const {updateUser} = require('../controllers/access')

route4.route('/user').put(updateUser)


module.exports = route4