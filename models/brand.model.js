'use strict'
const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)
const Schema = mongoose.Schema
const Product = require('./product.model')

const brandSchema = new Schema({
  brandID: {
    type: String,
    required: true,
    default: Date.now
  },
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    slug: 'name'
  },
  img: String,
  isArchived: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
})

brandSchema.methods.findBrandProducts = async function () {
  return await Product.find({ brandID: this.brandID })
}

brandSchema.methods.findNumberOfBrandProducts = async function () {
  return await Product.find({ brandID: this.brandID }).countDocuments()
}

brandSchema.methods.findTopBrandProducts = async function () {
  return await Product.find({ brandID: this.brandID }, null, { limit: 10, sort: { noOfPurchased: -1 } })
}

brandSchema.statics.findAll = async function () {
  return await this.model('Brand').find({ isArchived: false })
}

const Brand = mongoose.model('Brand', brandSchema)
module.exports = Brand
