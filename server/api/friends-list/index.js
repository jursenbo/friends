const passport = require('passport')

const { friendsList: fullFriendsList } = require('../../utils')

function initFriendsList(app) {
	app.get(
		'/api/friends/:begin?/:end?',
		passport.authenticationMiddleware(),
		function(req, res) {
			const { begin, end } = req.params
			const friendsList = fullFriendsList.slice(begin, end)
			res.send(JSON.stringify({ auth: true, friendsList }))
		}
	)
}

module.exports = initFriendsList
