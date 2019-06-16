'use strict'
const Product = require('../models/product.model')
const User = require('../models/user.model')

module.exports = {

  getHomepage: async (req, res) => {
    const products = await Product.countActiveItems()
    const users = await User.countActiveUsers()
    const data = {
      users,
      revenue: 10000,
      products,
      orders: 600
    }
    res.status(200).render('home/index', { title: 'Trang chủ', data })
  },

  getProfilePage: (req, res) => {
    res.status(200).render('profile', { title: 'Thông tin tài khoản', user: req.user })
  }
}
