const passport = require('passport')

function initAuth(app) {
	app.get('/api/auth', passport.authenticationMiddleware(), function(req, res) {
		res.send(JSON.stringify({ auth: true, name: req.user.name }))
	})
}

module.exports = initAuth
