'use strict'

module.exports = {
  getHomepage: (req, res) => {
    res.status(200).render('index', { title: 'Trang chủ' })
  }
}
