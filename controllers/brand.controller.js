'use strict'
const Brand = require('../models/brand.model')

module.exports = {
  getBrandList: async (req, res) => {
    const brands = await Brand.findAll()
    res
      .status(200)
      .render('brands', { title: 'Danh sách thương hiệu', brands: brands })
  },

  addNewBrand: async (req, res) => {
    res.status(200).render('brands/add', { title: 'Thêm thương hiệu mới' })
  }
}
