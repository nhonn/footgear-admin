const router = require('express').Router()
const ctrl = require('../controllers/index.controller')

router.get('/', ctrl.getHomepage)

module.exports = router
