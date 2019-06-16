'use strict'
const Brand = require('../models/brand.model')
const uploader = require('cloudinary').v2.uploader
const Product = require('../models/product.model')

module.exports = {
  getProductPage: async (req, res) => {
    let products = await Product.find({})
    const brands = await Brand.find({})
    products.forEach(e => {
      let brand = brands.filter(x => x.brandID == e.brandID)
      e.brand = brand[0].name
    });
    console.log(products)
    res
      .status(200)
      .render('products', { title: 'Danh sách sản phẩm', products })
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
    await uploader.upload(req.files.file.tempFilePath, function(error, result) {
      if (error) console.log(error)
      newProduct.images = result.url
      newProduct.save()
    })
    res.redirect('/products')
  }
}
