const router = require('express').Router()
const ctrl = require('../controllers/user.controller')

router.get('/', ctrl.getUserList)

router.get('/add', ctrl.getAddNewAdmin)

router.get('/profile/:id', ctrl.getProfile)

module.exports = router
