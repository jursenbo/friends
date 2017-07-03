const passport = require('passport')

const { friendsList: fullFriendsList } = require('../../utils')

function initSearch(app) {
	app.get('/api/search/:term?', passport.authenticationMiddleware(), function(
		req,
		res
	) {
		const { term } = req.params
		if (!term) {
			return res.send(
				JSON.stringify({ auth: true, friendsList: fullFriendsList.slice(0, 5) })
			)
		}
		const friendsList = fullFriendsList.filter(row => {
			const searchRegex = new RegExp(term, 'i')
			return searchRegex.test(row.name)
		})
		res.send(JSON.stringify({ auth: true, friendsList }))
	})
}

module.exports = initSearch
