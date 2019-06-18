const router = require('express').Router()
const ctrl = require('../controllers/admin.controller')

router.route('/')
  .get(ctrl.getProfile)
  .post(ctrl.updateProfile)

module.exports = router