const router = require('express').Router()
const ctrl = require('../controllers/api.controller')
const passport = require('passport')

router.get('/signin', ctrl.getSigninPage)

router.post(
  '/signin',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/api/signin',
    failureFlash: true
  })
)

router.post('/signup', ctrl.signup)

router.get('/signout', ctrl.signout)

router.post('/updatePassword', ctrl.updatePassword)

module.exports = router
