'use strict'
const Brand = require('../models/brand.model')
const uploader = require('cloudinary').v2.uploader
const Product = require('../models/product.model')

module.exports = {
  getProductPage: async (req, res) => {
    const products = await Product.find({})
    res
      .status(200)
      .render('products', { title: 'Danh sách sản phẩm', products })
  },
  getProductList: async (req, res) => {
    const data = { newTotalPages: 15 }
    res.json(data)
  },

  getNewProductPage: async (req, res) => {
    const brands = await Brand.findAll()
    res
      .status(200)
      .render('products/add', { title: 'Thêm sản phẩm mới', brands })
  },

  addNewProduct: async (req, res) => {
    let newProduct = new Product(req.body)
    newProduct.brandID = req.body.brand
    let url
    await uploader.upload(req.files.file.tempFilePath, function(error, result) {
      if (error) console.log(error)
      url = result.url
    })
    newProduct.images = url
    newProduct.save(err => console.log(err))
  }
}
