const passport = require('passport')
const { Strategy } = require('passport-local')

const authenticationMiddleware = require('./middleware')
const user = require('../utils/user.json')

function initPassport() {
	passport.use(
		new Strategy(function(username, password, cb) {
			if (user.email !== username) {
				return cb(null, false)
			}
			if (user.password !== password) {
				return cb(null, false)
			}
			return cb(null, user)
		})
	)

	passport.serializeUser((user, done) => {
		const sessionUser = {
			_id: user._id,
			name: user.name,
			email: user.email,
			roles: user.roles,
		}
		done(null, sessionUser)
	})

	passport.deserializeUser((sessionUser, done) => {
		done(null, sessionUser)
	})

	passport.authenticationMiddleware = authenticationMiddleware
}

module.exports = initPassport
