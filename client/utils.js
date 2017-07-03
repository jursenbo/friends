import fetch from 'isomorphic-fetch'

export const fetchJSON = ({
	url,
	method = 'get',
	headers = { accept: 'application/json', 'Content-Type': 'application/json' },
	credentials = 'same-origin',
	body,
}) =>
	fetch(url, { method, headers, credentials, body })
		.then(res => {
			if (res.status < 400) {
				return res.json()
			}
			return Promise.reject(new Error(res.status))
		})
		.catch(error => new Error(error))

export const validateEmail = email => {
	const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return emailRegex.test(email)
}
