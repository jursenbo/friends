import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'

import { validateEmail } from '../../utils'

import './style.css'

class LoginForm extends Component {
	constructor(props) {
		super(props)
		this.state = { username: null, password: null, error: null, message: null }

		this.onUsernameChange = debounce(this.onUsernameChange, 600)
		this.onPasswordChange = debounce(this.onPasswordChange, 600)
	}

	componentDidUpdate(prevProps) {
		this.props.message !== prevProps.message &&
			this.setState({ message: this.props.message })
		this.props.error !== prevProps.error &&
			this.setState({ error: this.props.error })
	}

	onUsernameChange() {
		const isEmailValid = validateEmail(this.username.value)
		if (!isEmailValid) {
			return this.setState({
				username: null,
				error: 'Please enter a valid e-mail address.',
			})
		}
		return this.setState({
			username: this.username.value,
			error: null,
		})
	}

	onPasswordChange() {
		if (this.password.value.length < 5) {
			return this.setState({
				error: 'Password must be at least 5 characters long.',
			})
		}
		return this.setState({
			password: this.password.value,
			error: null,
		})
	}

	render() {
		return (
			<section className="login-form card card--500px">
				<form>
					<div className="form-group">
						<label htmlFor="inputName">E-mail</label>
						<input
							className="form-control"
							type="text"
							id="inputName"
							placeholder="E-mail"
							ref={node => (this.username = node)}
							onChange={() => this.onUsernameChange()}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="inputPassword">Password</label>
						<input
							className="form-control"
							type="password"
							id="inputPassword"
							placeholder="Password"
							ref={node => (this.password = node)}
							onChange={() => this.onPasswordChange()}
						/>
					</div>
					<button
						className="btn btn-default"
						type="submit"
						onClick={e => {
							e.preventDefault()
							this.state.username &&
								this.state.password &&
								this.props.submitLoginForm({
									username: this.state.username,
									password: btoa(this.state.password),
								})
						}}
					>
						Login
					</button>
				</form>
				{this.state.message &&
					<section className="login-form__message">
						{this.state.message}
					</section>}
				{this.state.error &&
					<section className="login-form__message login-form__message--error">
						{this.state.error}
					</section>}
			</section>
		)
	}
}

LoginForm.propTypes = {
	submitLoginForm: PropTypes.func.isRequired,
	message: PropTypes.string,
	error: PropTypes.string,
}

export default LoginForm
