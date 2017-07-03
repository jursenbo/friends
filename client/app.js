import React from 'react'
import ReactDOM, { render } from 'react-dom'

import Root from './containers/root'
import './style.css'

const container = document.getElementById('container')

export default store => {
	if (module.hot) {
		module.hot.accept('./containers/root', () => {
			const RootContainer = require('./containers/root').default

			render(<RootContainer store={store} />, container)
		})
	}

	return render(<Root store={store} />, container)
}
