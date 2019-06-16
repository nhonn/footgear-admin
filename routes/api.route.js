const router = require('express').Router()
const ctrl = require('../controllers/api.controller')
const passport = require('passport')

router.get('/signin', ctrl.getSigninPage)

router.post(
  '/signin',
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/api/signin'
  })
)

router.post('/signup', ctrl.signup)

router.get('/signout', ctrl.signout)

module.exports = router
