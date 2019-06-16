const router = require('express').Router()
const ctrl = require('../controllers/product.controller')

router.get('/', ctrl.getProductPage)
router
  .route('/add')
  .get(ctrl.getNewProductPage)
  .post(ctrl.addNewProduct)

module.exports = router
