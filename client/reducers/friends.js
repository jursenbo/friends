import { RECEIVE_CONTENT } from '../actions/content'
import { FRIENDS_CONTENT, FRIENDS_SEARCH_CONTENT } from '../actions/friends'

const initialState = []

const friends = (state = initialState, action) => {
	if (action.type === RECEIVE_CONTENT && action && action.meta) {
		switch (action.meta.contentType) {
			case FRIENDS_CONTENT:
				return [...state, ...action.payload.friendsList]

			case FRIENDS_SEARCH_CONTENT:
				return [...action.payload.friendsList]

			default:
				return [...state]
		}
	}

	return state
}

export default friends
