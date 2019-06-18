const router = require('express').Router()
const ctrl = require('../controllers/order.controller')

router.get('/done', ctrl.getDoneOrders)
router.get('/processing', ctrl.getProcessingOrders)
router.get('/shipping', ctrl.getShippingOrders)
router.get('/processing/:id', ctrl.doneProcessing)
router.get('/shipping/:id', ctrl.doneShipping)
router.get('/detail/:id', ctrl.getDetail)

module.exports = router
