'use strict'
const Brand = require('../models/brand.model')
const uploader = require('cloudinary').v2.uploader
const Product = require('../models/product.model')

module.exports = {
  getProductPage: async (req, res) => {
    let products = await Product.find({ isArchived: false })
    const brands = await Brand.find({})
    products.forEach(e => {
      let brand = brands.filter(x => x.brandID == e.brandID)
      e.brand = brand[0].name
    });
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
    product.size = req.body.size.split(',')
    await uploader.upload(req.files.file.tempFilePath, function (error, result) {
      if (error) console.log(error)
      newProduct.images = result.url
      newProduct.save()
    })
    res.redirect('/products')
  },

  getDetail: async (req, res) => {
    const brands = await Brand.find({})
    const product = await Product.findOne({ productID: req.params.id })
    product.sizeString = product.size.toString()
    const defaultBrandName = brands.filter(x => x.brandID == product.brandID)[0].name
    res.status(200).render('products/detail', { title: product.name, product, brands, defaultBrandName })
  },

  updateDetail: async (req, res) => {
    let product = await Product.findOne({ productID: req.params.id })
    product.brandID = req.body.brand
    product.name = req.body.name
    product.price = req.body.price
    product.description = req.body.description
    product.size = req.body.size.split(',')
    if (req.files !== undefined) {
      await uploader.upload(req.files.file.tempFilePath, function (error, result) {
        if (error) console.log(error)
        else {
          product.images = result.url
          product.save()
        }
      })
    } else product.save()
    res.redirect('back')
  },

  delete: async (req, res) => {
    let product = await Product.findOne({ productID: req.params.id })
    product.isArchived = true
    product.save()
    res.redirect('/products')
  }
}
