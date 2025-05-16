const {createOrder, getOrder, submitOrder, getOrderHistory} = require('../controllers/order');
const express = require('express');
const router3 = express.Router()


router3.route('/').post(createOrder)
router3.route('/mine').get(getOrderHistory)
router3.route('/:id').get(getOrder)
router3.route('/:id/pay').put(submitOrder)

module.exports = router3