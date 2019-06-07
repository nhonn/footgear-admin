'use strict'

module.exports = {
  getHomepage: (req, res) => {
    res.status(200).render('home/index', { title: 'Trang chủ' })
  }
}
