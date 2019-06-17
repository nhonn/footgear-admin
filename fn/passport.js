const LocalStrategy = require('passport-local').Strategy
const Admin = require('../models/admin.model')

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'username', passReqToCallback: true }, async function (
      req,
      username,
      password,
      done
    ) {
      try {
        const user = await Admin.get(username)
        if (!user) {
          return done(null, false, req.flash('error', 'Tài khoản không tồn tại.'))
        }
        const isPasswordValid = await Admin.verify(username, password)
        if (!isPasswordValid) {
          return done(null, false, req.flash('error', 'Sai mật khẩu.'))
        }
        return done(null, user)
      } catch (ex) {
        return done(ex)
      }
    })
  )

  passport.serializeUser(function (user, done) {
    done(null, user.username)
  })

  passport.deserializeUser(async function (username, done) {
    const user = await Admin.get(username)
    done(undefined, user)
  })
}
