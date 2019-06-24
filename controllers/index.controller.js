'use strict'
const Product = require('../models/product.model')
const User = require('../models/user.model')
const Order = require('../models/order.model')

module.exports = {
  getHomepage: async (req, res) => {
    const products = await Product.countActiveItems()
    const users = await User.countActiveUsers()
    const orders = await Order.countOrders()
    const data = {
      users,
      revenue: 10000,
      products,
      orders
    }
    res.status(200).render('home', { title: 'Trang chủ', data })
  },

  getProfilePage: (req, res) => {
    res.status(200).render('account/profile', { title: 'Thông tin tài khoản' })
  }
}
