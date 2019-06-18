'use strict';
const Order = require('../models/order.model')

module.exports = {
  getDoneOrders: async (req, res) => {
    const orders = await Order.findDoneOrders()
    res.status(200).render('orders/done', { title: 'Đơn hàng đã hoàn thành', orders })
  },

  getProcessingOrders: async (req, res) => {
    const orders = await Order.findProcessingOrders()
    res.status(200).render('orders/processing', { title: 'Đơn hàng đang xử lý', orders })
  },

  getShippingOrders: async (req, res) => {
    const orders = await Order.findShippingOrders()
    res.status(200).render('orders/shipping', { title: 'Đơn hàng đang vận chuyển', orders })
  },

  doneProcessing: async (req, res) => {
    let order = await Order.findOne({ orderID: req.params.id })
    order.status = 'shipping'
    order.save()
    res.redirect('back')
  },

  doneShipping: async (req, res) => {
    let order = await Order.findOne({ orderID: req.params.id })
    order.status = 'done'
    order.save()
    res.redirect('back')
  }
}