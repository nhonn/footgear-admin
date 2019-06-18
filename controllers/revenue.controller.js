const Order = require('../models/order.model')

module.exports = {
  getYearRevenue: (req, res) => {
    const year = req.query.year

    res.render('revenue/year', { title: 'Doanh thu theo năm' })
  }
}