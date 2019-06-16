const router = require('express').Router()
const ctrl = require('../controllers/index.controller')

router.get('/', ctrl.getHomepage)

router.get('/profile', ctrl.getProfilePage)

module.exports = router
