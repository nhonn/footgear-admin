'use strict'
const User = require('../models/user.model')

module.exports = {
  getUserList: async (req, res) => {
    const users = await User.find({})
    res
      .status(200)
      .render('users', { title: 'Danh sách tài khoản người dùng', users })
  },

  getAddNewAdmin: (req, res) => {
    res.status(200).render('users/add', { title: 'Thêm tài khoản mới' })
  },

  getProfile: async (req, res) => {
    const user = await User.getByID(req.params.id)
    res.status(200).render('users/profile', { title: user.fullname, user })
  },

  lockAcc: async (req, res) => {
    const userID = req.params.id
    console.log('lock is caleed')
    await User.lock(userID)
    res.redirect('back')
  },

  unlockAcc: async (req, res) => {
    const userID = req.params.id
    console.log('unlock is caleed')
    await User.unlock(userID)
    res.redirect('back')
  },

  updateProfile: async (req, res) => {
    const user = await User.getByID(req.params.id)
    user.fullname = req.body.fullname
    user.phone = req.body.phone
    user.gender = req.body.gender
    user.save()
    res.redirect('back')
  }
}
