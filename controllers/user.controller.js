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
    res.status(200).render('users/profile', {
      title: 'Thông tin tài khoản người dùng',
      user,
      flash: req.flash('success')
    })
  },

  lockAcc: async (req, res) => {
    await User.lock(req.params.id)
    req.flash('success', 'Khóa tài khoản thành công.')
    res.redirect('back')
  },

  unlockAcc: async (req, res) => {
    await User.unlock(req.params.id)
    req.flash('success', 'Mở khóa tài khoản thành công.')
    res.redirect('back')
  },

  updateProfile: async (req, res) => {
    const user = await User.getByID(req.params.id)
    user.fullname = req.body.fullname
    user.phone = req.body.phone
    user.gender = req.body.gender
    user.save()
    req.flash('success', 'Thay đổi thông tin thành công')
    res.redirect('back')
  }
}
