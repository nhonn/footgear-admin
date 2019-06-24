'use strict'
const Brand = require('../models/brand.model')
const uploader = require('cloudinary').v2.uploader

module.exports = {
  getBrandList: async (req, res) => {
    const brands = await Brand.findAll()
    res.status(200).render('brands', {
      title: 'Danh sách thương hiệu',
      brands: brands,
      flash: req.flash()
    })
  },

  newBrandPage: async (req, res) => {
    res.status(200).render('brands/add', { title: 'Thêm thương hiệu mới' })
  },

  addNewBrand: async (req, res) => {
    let newBrand = new Brand({
      name: req.body.name
    })
    console.log('add brand is not fcking called')
    await uploader.upload(req.files.file.tempFilePath, function(error, result) {
      if (error) console.log(error)
      newBrand.img = result.url
      console.log(newBrand.img)
      newBrand.save()
      res.status(200).redirect('/brands')
    })
  },

  getBrandProducts: async (req, res) => {
    const brand = await Brand.findOne({ slug: req.params.slug })
    let data
    if (brand == null) data = null
    else data = await brand.findBrandProducts()
    res.status(200).render('brands/detail', { title: brand.name, brand, data })
  },

  update: async (req, res) => {
    /*
    const brand = await Brand.findOne({ brandID: req.params.id })
    if (brand == null) res.redirect('/brands')
    if (req.files.file !== undefined) {
      let result = await uploader.upload(req.files.file.tempFilePath)
      brand.img = result.url
      brand.save()
    }
    */
    res.redirect('/brands')
  },

  delete: async (req, res) => {
    const brand = await Brand.findOne({ brandID: req.params.id })
    const n = await brand.findNumberOfBrandProducts()
    if (n > 0) {
      req.flash('error', 'Không thể xóa do thương hiệu vẫn còn chứa sản phẩm')
    } else {
      brand.isArchived = true
      brand.save()
    }
    res.redirect('/brands')
  }
}
