'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
  orderID: {
    type: String,
    required: true,
    default: Date.now
  },
  totalPrice: {
    type: Number,
    default: 0
  },
  items: [Object],
  status: String,
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: Date.now()
  }
})

orderSchema.pre('save', function() {
  this.updated_at = Date.now()
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order
