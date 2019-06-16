'use strict'
const Admin = require('../models/admin.model')

module.exports = {
  getSigninPage: (req, res) => {
    res.status(200).render('profile/signin', { layout: false })
  },

  signup: (req, res) => {
    console.log(req.body)
    const newAdmin = new Admin(req.body)
    newAdmin.save()
  },

  signout: (req, res) => {
    req.logout()
    res.redirect('/')
  }
}
