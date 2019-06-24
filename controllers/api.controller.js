'use strict'
const Admin = require('../models/admin.model')
const bcrypt = require('bcrypt')

module.exports = {
  getSigninPage: (req, res) => {
    res.status(200).render('account/login', {
      layout: false,
      title: 'Đăng nhập',
      flash: req.flash()
    })
  },

  signup: (req, res) => {
    console.log(req.body)
    const newAdmin = new Admin(req.body)
    newAdmin.save()
  },

  signout: (req, res) => {
    req.logout()
    res.redirect('/')
  },

  updatePassword: async (req, res) => {
    let user = req.user
    let tmp = await bcrypt.compare(req.body.oldpass, user.password)
    if (tmp) {
      user.password = req.body.password
      user.save()
      req.flash('success', 'Thay đổi mật khẩu thành công.')
    } else {
      req.flash('error', 'Sai mật khẩu.')
    }
    res.redirect('back')
  }
}
