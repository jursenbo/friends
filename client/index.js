import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import combinedReducers from './reducers'

import app from './app'

const enhancer = compose(
	applyMiddleware(
		...[thunkMiddleware].concat(
			process.env.NODE_ENV === 'development'
				? [createLogger({ collapsed: true })]
				: []
		)
	)
)

const store = createStore(combinedReducers, enhancer)

app(store)
