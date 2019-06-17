const router = require('express').Router()
const ctrl = require('../controllers/product.controller')

router.get('/', ctrl.getProductPage)
router
  .route('/add')
  .get(ctrl.getNewProductPage)
  .post(ctrl.addNewProduct)

router.route('/:id')
  .get(ctrl.getDetail)
  .post(ctrl.updateDetail)

router.get('/rm/:id', ctrl.delete)

module.exports = router
