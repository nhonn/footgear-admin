'use strict'

module.exports = {
  getHomepage: (req, res) => {
    const data = {
      users: 1000,
      revenue: 10000,
      products: 200,
      orders: 600
    }
    res.status(200).render('home/index', { title: 'Trang chủ', data })
  }
}
