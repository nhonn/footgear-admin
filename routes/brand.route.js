const router = require('express').Router()
const ctrl = require('../controllers/brand.controller')

router.get('/', ctrl.getBrandList)

router.get('/add', ctrl.newBrandPage)
router.post('/add', ctrl.addNewBrand)

module.exports = router
