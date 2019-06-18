const router = require('express').Router()
const ctrl = require('../controllers/revenue.controller')

router.get('/year', ctrl.getYearRevenue)

module.exports = router
