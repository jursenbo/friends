import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'

import MainContainer from './main'

const propTypes = {
	store: PropTypes.object.isRequired,
}

function Root(props) {
	const { store } = props
	return (
		<Provider store={store}>
			<MainContainer />
		</Provider>
	)
}

Root.propTypes = propTypes

export default Root
