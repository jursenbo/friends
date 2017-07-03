import { fetchJSON } from '../utils'

export const REQUEST_CONTENT = 'REQUEST_CONTENT'
export const RECEIVE_CONTENT = 'RECEIVE_CONTENT'
export const ERROR_RECEIVING_CONTENT = 'ERROR_RECEIVING_CONTENT'

export const CONTENT_NOT_LOADED = 'CONTENT_NOT_LOADED'
export const CONTENT_LOADING = 'CONTENT_LOADING'
export const CONTENT_LOADED = 'CONTENT_LOADED'
export const CONTENT_LOADING_ERROR = 'CONTENT_LOADING_ERROR'

export function requestContent({ contentType, url, context, loadedKey }) {
	return {
		type: REQUEST_CONTENT,
		meta: {
			contentType,
			url,
			context,
			loadedKey,
		},
	}
}

export function receiveContent({ data, contentType, url, context, loadedKey }) {
	return {
		type: RECEIVE_CONTENT,
		payload: data,
		meta: {
			contentType,
			url,
			context,
			loadedKey,
		},
	}
}

export function errorReceivingContent({
	error,
	contentType,
	url,
	context,
	loadedKey,
}) {
	return {
		type: ERROR_RECEIVING_CONTENT,
		error,
		meta: {
			contentType,
			url,
			context,
			loadedKey,
		},
	}
}

export function fetchContent({
	url,
	contentType,
	context,
	loadedKey,
	method,
	body,
}) {
	return dispatch => {
		dispatch(
			requestContent({
				url,
				contentType,
				context,
				loadedKey,
			})
		)

		return fetchJSON({ url, method, body })
			.then(data =>
				dispatch(
					receiveContent({
						data,
						url,
						contentType,
						context,
						loadedKey,
					})
				)
			)
			.catch(error =>
				dispatch(
					errorReceivingContent({
						error,
						url,
						contentType,
						context,
						loadedKey,
					})
				)
			)
	}
}

export function fetchContentIfNeeded({
	url,
	contentType,
	context,
	loadedKey,
	method,
}) {
	return (dispatch, getState) => {
		const { loaded: { [loadedKey]: status } } = getState()

		if (
			status !== CONTENT_LOADED &&
			status !== CONTENT_LOADING &&
			status !== CONTENT_LOADING_ERROR
		) {
			return dispatch(
				fetchContent({
					url,
					contentType,
					context,
					loadedKey,
					method,
				})
			)
		}

		return false
	}
}
