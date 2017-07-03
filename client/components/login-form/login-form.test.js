import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import LoginForm from './'

jest.mock('../../utils', () => {
	return {
		validateEmail: jest.fn(un => un === 'testUsername'),
	}
})

jest.mock('lodash', () => {
	return {
		debounce: jest.fn(func => func),
	}
})

describe('LoginForm snapshots', () => {
	test('renders form', () => {
		const component = renderer.create(<LoginForm submitLoginForm={() => {}} />)
		let tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})

	test('renders form with message', () => {
		const component = renderer.create(
			<LoginForm submitLoginForm={() => {}} message="message" />
		)
		let tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})

	test('renders form with error', () => {
		const component = renderer.create(
			<LoginForm submitLoginForm={() => {}} error="error" />
		)
		let tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})
})

describe('LoginForm methods', () => {
	test('componentDidUpdate', () => {
		const loginForm = shallow(<LoginForm submitLoginForm={() => {}} />)
		expect(loginForm.state('error')).toBeNull()
		expect(loginForm.state('message')).toBeNull()
		loginForm.setProps({ message: 'testMessage', error: 'testError' })
		loginForm.instance().componentDidUpdate({})
		expect(loginForm.state('error')).toBe('testError')
		expect(loginForm.state('message')).toBe('testMessage')
	})

	test('onUsernameChange', () => {
		const username = 'testUsername'
		const loginFormInstance = shallow(
			<LoginForm submitLoginForm={() => {}} />
		).instance()
		expect(loginFormInstance.state.username).toBeNull()
		loginFormInstance.username = { value: username }
		loginFormInstance.onUsernameChange()
		expect(loginFormInstance.state.username).toBe(username)
		loginFormInstance.username = { value: 'abc' }
		loginFormInstance.onUsernameChange()
		expect(loginFormInstance.state.username).toBeNull()
		expect(loginFormInstance.state.error).toBe(
			'Please enter a valid e-mail address.'
		)
	})
})
