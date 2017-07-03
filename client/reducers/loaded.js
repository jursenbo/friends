const {
	REQUEST_CONTENT,
	RECEIVE_CONTENT,
	ERROR_RECEIVING_CONTENT,
	CONTENT_LOADING,
	CONTENT_LOADED,
	CONTENT_LOADING_ERROR,
} = require('../actions/content')

function getContentState({ type, payload }) {
	if (payload instanceof Error) {
		return payload
	}
	return {
		[REQUEST_CONTENT]: CONTENT_LOADING,
		[RECEIVE_CONTENT]: CONTENT_LOADED,
		[ERROR_RECEIVING_CONTENT]: CONTENT_LOADING_ERROR,
	}[type]
}

const initialState = {}

const loaded = (state = initialState, action) => {
	const { type, meta } = action

	if (
		type === REQUEST_CONTENT ||
		type === RECEIVE_CONTENT ||
		type === ERROR_RECEIVING_CONTENT
	) {
		const contentState = getContentState(action)
		return {
			...state,
			[meta.loadedKey]: contentState,
		}
	}

	return state
}

export default loaded
