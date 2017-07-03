const { renderPageMarkup } = require('../utils')

function authenticationMiddleware() {
	return function(req, res, next) {
		if (req.isAuthenticated()) {
			return next()
		}
		res.send(
			JSON.stringify({
				auth: false,
				message: 'Please authenticate to access the content.',
			})
		)
	}
}

module.exports = authenticationMiddleware
