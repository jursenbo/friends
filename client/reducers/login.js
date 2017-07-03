import { RECEIVE_CONTENT } from '../actions/content'
import { LOGIN_CONTENT } from '../actions/login'

const initialState = { auth: false }

const login = (state = initialState, action) => {
	if (action && action.meta && action.meta.contentType === LOGIN_CONTENT) {
		switch (action.type) {
			case RECEIVE_CONTENT:
				return {
					...state,
					...action.payload,
				}
			default:
				return { ...state }
		}
	}

	return state
}

export default login
