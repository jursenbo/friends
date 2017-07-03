import { combineReducers } from 'redux'

import loaded from './loaded'
import login from './login'
import friends from './friends'

export default combineReducers({
	loaded,
	login,
	friends,
})
