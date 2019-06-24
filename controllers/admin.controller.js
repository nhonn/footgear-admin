/* eslint-disable eqeqeq */
const Admin = require('../models/admin.model')

function compare(db, form) {
  if (
    db.fullname == form.fullname &&
    db.ID == form.ID &&
    db.gender == form.gender &&
    db.email == form.email &&
    db.phone == form.phone
  ) {
    return false
  }
  return true
}

module.exports = {
  getProfile: async (req, res) => {
    res.status(200).render('account/profile', {
      title: 'Thông tin tài khoản',
      flash: req.flash()
    })
  },

  updateProfile: async (req, res) => {
    let user = await Admin.get(req.user.username)
    if (compare(user, req.body)) {
      user.fullname = req.body.fullname
      user.ID = req.body.ID
      user.gender = req.body.gender
      user.email = req.body.email
      user.phone = req.body.phone
      user.save()
      req.flash('success', 'Thay đổi thông tin thành công.')
    } else {
      req.flash('error', 'Không có thông tin cần thay đổi.')
    }
    res.redirect('back')
  }
}
