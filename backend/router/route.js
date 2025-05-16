const {findOneProductById, findProduct, findOneProductBySlug} = require('../controllers/page')
const express = require('express')
const router = express.Router()

router.route('/').get(findProduct)
router.route('/slug/:slug').get(findOneProductBySlug)
router.route('/:id').get(findOneProductById)

module.exports = router