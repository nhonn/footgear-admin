const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user.model')

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async function(
      username,
      password,
      done
    ) {
      try {
        const user = await User.get(username)
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' })
        }
        const isPasswordValid = await User.verify(username, password)
        if (!isPasswordValid) {
          return done(null, false, { message: 'Incorrect password.' })
        }
        return done(null, user)
      } catch (ex) {
        return done(ex)
      }
    })
  )

  passport.serializeUser(function(user, done) {
    done(null, user.email)
  })

  passport.deserializeUser(async function(email, done) {
    const user = await User.get(email)
    done(undefined, user)
  })
}
