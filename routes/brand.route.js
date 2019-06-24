const router = require('express').Router()
const ctrl = require('../controllers/brand.controller')

router.get('/', ctrl.getBrandList)
router.get('/detail/:slug', ctrl.getBrandProducts)
router.post('/:id', ctrl.update)
router.get('/rm/:id', ctrl.delete)

router.get('/add', ctrl.newBrandPage)
router.post('/add', ctrl.addNewBrand)

module.exports = router
