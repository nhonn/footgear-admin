'use strict'
const Product = require('../models/product.model')
const Brand = require('../models/brand.model')

module.exports = {
  getTopProducts: async (req, res) => {
    let data = await Product.findHotItems()
    const brands = await Brand.findAll()
    data.forEach(x => {
      brands.forEach(e => {
        if (e.brandID === x.brandID) x.brand = e.name
      })
    })
    res
      .status(200)
      .render('top/product', { title: 'Top 10 sản phẩm bán chạy', data })
  },

  getBrandsTop: async (req, res) => {
    let brands = await Brand.findAll()
    let brand = await Brand.findOne({ brandID: req.query.q })
    let data
    if (brand == null) data = null
    else data = await brand.findTopBrandProducts()
    console.log(data)
    res
      .status(200)
      .render('top/brand', { title: 'Top thương hiệu', brands, data })
  }
}
