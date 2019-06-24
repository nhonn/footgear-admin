const Admin = require('../models/admin.model')

module.exports = {
  getProfile: async (req, res) => {
    res.status(200).render('account/profile', {
      title: 'Thông tin tài khoản',
      flash: req.flash()
    })
  },

  updateProfile: async (req, res) => {
    let user = await Admin.get(req.user.username)
    user.fullname = req.body.fullname
    user.ID = req.body.ID
    user.gender = req.body.gender
    user.email = req.body.email
    user.phone = req.body.phone
    user.save()
    res.redirect('back')
  }
}
