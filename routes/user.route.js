const router = require('express').Router()
const ctrl = require('../controllers/user.controller')

router.get('/', ctrl.getUserList)

router.get('/add', ctrl.getAddNewAdmin)

router.get('/profile/:id', ctrl.getProfile)
router.post('/profile/:id', ctrl.updateProfile)

router.get('/lock/:id', ctrl.lockAcc)

router.get('/unlock/:id', ctrl.unlockAcc)

module.exports = router
