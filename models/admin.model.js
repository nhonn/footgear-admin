'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const adminSchema = new Schema({
  adminID: {
    type: String,
    required: true,
    default: Date.now
  },
  username: {
    type: String,
    required: true
  },
  ID: {
    type: String,
    required: true
  },
  fullname: String,
  gender: {
    // 0: Male, 1: Female
    type: Boolean,
    default: 0
  },
  email: String,
  password: {
    type: String,
    required: true
  },
  phone: String,
  isDeleted: {
    type: Boolean,
    default: 0,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  update_at: {
    type: Date,
    default: Date.now
  }
})

adminSchema.pre('save', async function() {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 5)
  }
  this.updated_at = Date.now()
})

adminSchema.statics.get = async function(username) {
  return await this.model('Admin').findOne({ username })
}

adminSchema.statics.check = async function(username) {
  const admin = await this.model('Admin').findOne({ username })
  if (admin != null) return true
  return false
}

adminSchema.statics.verify = async function(username, password) {
  const admin = await this.model('Admin').get(username)
  if (admin == null) return false
  return await bcrypt.compare(password, admin.password)
}

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin
