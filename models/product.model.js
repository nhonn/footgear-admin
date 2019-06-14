'use strict'
const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
const Brand = require('./brand.model')
mongoose.plugin(slug)
const Schema = mongoose.Schema

const productSchema = new Schema({
  productID: {
    type: String,
    required: true,
    default: Date.now
  },
  brandID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    slug: 'name',
    unique: true
  },
  price: {
    type: String,
    required: true
  },
  description: String,
  size: [Number],
  images: String,
  noOfPurchased: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: Date.now()
  },
  isArchived: {
    type: Boolean,
    default: false
  }
})

productSchema.pre('save', function() {
  this.updated_at = Date.now()
})

productSchema.statics.findHotItems = async function() {
  return await this.model('Product').find({}, null, {
    limit: 10,
    sort: { noOfPurchased: -1 }
  })
}

const Product = mongoose.model('Product', productSchema)
module.exports = Product
