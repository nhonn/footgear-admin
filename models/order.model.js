'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const orderSchema = new Schema({
  orderID: {
    type: String,
    required: true,
    default: Date.now
  },
  userID: {
    type: String,
    required: true
  },
  totalPrice: {
    type: Number,
    default: 0
  },
  items: [Object],
  // processing, shipping, done
  status: {
    type: String,
    default: 'processing'
  },
  fullname: String,
  address: String,
  phone: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})

orderSchema.pre('save', async function () {
  this.updated_at = Date.now()
})

orderSchema.statics.findDoneOrders = async function () {
  let orders = await this.model('Order').find({ status: 'done' })
  orders.forEach(e => {
    e.date = moment(e.created_at).format('DD/MM/YYYY HH:mm')
    e.done = moment(e.updated_at).format('DD/MM/YYYY HH:mm')
  })
  return orders
}

orderSchema.statics.findProcessingOrders = async function () {
  let orders = await this.model('Order').find({ status: 'processing' })
  orders.forEach(e => {
    e.date = moment(e.created_at).format('DD/MM/YYYY HH:mm')
  })
  return orders
}

orderSchema.statics.findShippingOrders = async function () {
  let orders = await this.model('Order').find({ status: 'shipping' })
  orders.forEach(e => {
    e.date = moment(e.created_at).format('DD/MM/YYYY HH:mm')
  })
  return orders
}

orderSchema.statics.findOrdersOfYear = async function (year) {
  const firstDay = new Date(year, 0, 1)
  const lastDay = new Date(year, 11, 31)
  let orders = await this.model('Order').find({ status: 'done', updated_at: { $lte: lastDay, $gte: firstDay } })
  return orders
}

orderSchema.statics.countOrders = async function () {
  return await this.model('Order').find({}).countDocuments()
}

const Order = mongoose.model('Order', orderSchema)
module.exports = Order
