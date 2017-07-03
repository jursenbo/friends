const passport = require('passport')

function initLogin(app) {
	app.post('/api/login', function(req, res, next) {
		passport.authenticate('local', function(err, user, info) {
			if (err) {
				return next(err)
			}
			if (!user) {
				return res.send(
					JSON.stringify({
						auth: false,
						error:
							'Authentication failed. Please verify username and password.',
					})
				)
			}
			req.logIn(user, function(err) {
				if (err) {
					return next(err)
				}
				return res.send(JSON.stringify({ auth: true, name: user.name }))
			})
		})(req, res, next)
	})
}

module.exports = initLogin
