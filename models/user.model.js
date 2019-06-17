'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  userID: {
    type: String,
    required: true,
    default: Date.now
  },
  fullname: String,
  gender: {
    // 0: Male, 1: Female
    type: Boolean,
    default: 0
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: String,
  isActive: {
    type: Boolean,
    default: 0,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  update_at: {
    type: Date,
    default: Date.now()
  }
})

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 5)
  }
  this.updated_at = Date.now()
})

userSchema.statics.findActiveUsers = async function () {
  return await this.model('User').find({ isActive: true })
}

userSchema.statics.countActiveUsers = async function () {
  return await this.model('User').find({ isActive: true }).countDocuments()
}

userSchema.statics.get = async function (email) {
  return await this.model('User').findOne({ email })
}

userSchema.statics.getByID = async function (userID) {
  return await this.model('User').findOne({ userID })
}

userSchema.statics.lock = async function (userID) {
  let user = await this.model('User').findOne({ userID })
  user.isActive = false
  user.save()
}

userSchema.statics.unlock = async function (userID) {
  let user = await this.model('User').findOne({ userID })
  user.isActive = true
  user.save()
}

userSchema.statics.check = async function (email) {
  const user = await this.model('User').findOne({ email })
  if (user != null) return true
  return false
}

userSchema.statics.verify = async function (email, password) {
  const user = await this.model('User').get(email)
  if (user == null) return false
  return await bcrypt.compare(password, user.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User
