const router = require('express').Router()
const ctrl = require('../controllers/top.controller')

router.get('/products', ctrl.getTopProducts)

module.exports = router
