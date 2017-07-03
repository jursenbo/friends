const express = require('express')
const session = require('express-session')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const passport = require('passport')
const helmet = require('helmet')

const initPassport = require('./authentication/initPassport')
const initLogin = require('./api/login')
const initFriendsList = require('./api/friends-list')
const initAuth = require('./api/auth')
const initSearch = require('./api/search')
const { renderPageMarkup } = require('./utils')

const app = express()
app.use(helmet())
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(
	session({
		secret: 'best friends',
		resave: false,
		saveUninitialized: false,
	})
)
app.use(express.static('server/static'))

initPassport()
app.use(passport.initialize())
app.use(passport.session())

initLogin(app)
initFriendsList(app)
initAuth(app)
initSearch(app)

app.get('/', function(req, res) {
	res.send(renderPageMarkup())
})

app.listen(3000)
