import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import LoginForm from '../components/login-form'
import FriendsTable from '../components/friends-table'
import { fetchContentIfNeeded, fetchContent } from '../actions/content'
import { FRIENDS_CONTENT, FRIENDS_SEARCH_CONTENT } from '../actions/friends'
import { LOGIN_CONTENT } from '../actions/login'

class MainContainer extends Component {
	constructor(props) {
		super(props)
		this.state = { begin: 0, end: 5 }
	}

	componentDidMount() {
		this.props.login &&
			!this.props.login.auth &&
			this.props.dispatch(
				fetchContent({
					url: `/api/auth`,
					contentType: LOGIN_CONTENT,
				})
			)
	}

	componentDidUpdate(prevProps) {
		const isAuth = this.props.login && this.props.login.auth
		const friendsNotLoaded = this.props.friends && !this.props.friends.length

		if (isAuth && friendsNotLoaded) {
			this.props.dispatch(
				fetchContentIfNeeded({
					url: `/api/friends/${this.state.begin}/${this.state.end}`,
					contentType: FRIENDS_CONTENT,
					loadedKey: `friends-list_${this.state.begin}-${this.state.end}`,
				})
			)
		}
	}

	render() {
		const { login, friends } = this.props
		const submitLoginForm = data =>
			this.props.dispatch(
				fetchContent({
					url: `/api/login`,
					method: 'post',
					body: JSON.stringify(data),
					contentType: LOGIN_CONTENT,
				})
			)

		const loadMoreRows = (begin, count) =>
			this.props.dispatch(
				fetchContent({
					url: `/api/friends/${begin}/${count}`,
					contentType: FRIENDS_CONTENT,
				})
			)

		const searchFriends = name =>
			this.props.dispatch(
				fetchContent({
					url: `/api/search/${name}`,
					contentType: FRIENDS_SEARCH_CONTENT,
				})
			)

		return login && login.auth && friends
			? <FriendsTable
					friends={friends}
					loadMoreRows={loadMoreRows}
					searchFriends={searchFriends}
				/>
			: <LoginForm
					submitLoginForm={submitLoginForm}
					message={login.message}
					error={login.error}
				/>
	}
}

MainContainer.propTypes = {
	friends: PropTypes.array,
	login: PropTypes.object,
}

function mapStateToProps(state) {
	return {
		friends: state.friends,
		login: state.login,
	}
}

export default connect(mapStateToProps)(MainContainer)
