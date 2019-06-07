'use strict'
const User = require('../models/user.model')

module.exports = {
  getUserList: async (req, res) => {
    const users = await User.findActiveUser()
    res
      .status(200)
      .render('users', { title: 'Danh sách tài khoản người dùng', users })
  },

  getAddNewAdmin: (req, res) => {
    res.status(200).render('users/add')
  },

  getProfile: (req, res) => {
    res.status(200).render('users/profile')
  }
}
