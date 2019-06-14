'use strict'
const Brand = require('../models/brand.model')
const uploader = require('cloudinary').v2.uploader

module.exports = {
  getBrandList: async (req, res) => {
    const brands = await Brand.findAll()
    res
      .status(200)
      .render('brands', { title: 'Danh sách thương hiệu', brands: brands })
  },

  newBrandPage: async (req, res) => {
    res.status(200).render('brands/add', { title: 'Thêm thương hiệu mới' })
  },

  addNewBrand: async (req, res) => {
    let newBrand = new Brand(req.body)
    let url
    await uploader.upload(req.files.file.tempFilePath, function(error, result) {
      if (error) console.log(error)
      url = result.url
    })
    newBrand.img = url
    newBrand.save(err => console.log(err))
    res.status(200).redirect('/brands')
  }
}
