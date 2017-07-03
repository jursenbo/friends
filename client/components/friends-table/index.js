import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'

import './style.css'

class FriendsTable extends Component {
	constructor(props) {
		super(props)
		this.state = {
			page: 0,
			count: 5,
			maxToLoad: 50,
			search: null,
			friends: [],
			genderFilter: null,
		}
		this.handleSearchChange = debounce(this.handleSearchChange, 600)
	}

	componentDidUpdate(prevProps) {
		prevProps.friends !== this.props.friends &&
			this.setState({
				friends: this.state.genderFilter
					? this.props.friends.filter(
							row => row.gender === this.state.genderFilter
						)
					: this.props.friends,
			})
	}

	nextParams() {
		const max = this.state.search
			? this.state.friends.length
			: this.state.maxToLoad
		const nextPage =
			this.state.page + 1 < max / this.state.count
				? this.state.page + 1
				: this.state.page
		const begin = nextPage * this.state.count
		const end = (nextPage + 1) * this.state.count
		return {
			nextPage,
			begin,
			end,
		}
	}

	handleNext() {
		const { nextPage, begin, end } = this.nextParams()
		!this.state.search &&
			this.rowsNotLoaded() &&
			this.props.loadMoreRows(begin, end)
		this.setState({ page: nextPage })
	}

	handlePrev() {
		const prevPage =
			this.state.page - 1 >= 0 ? this.state.page - 1 : this.state.page
		this.setState({ page: prevPage })
	}

	rowsNotLoaded() {
		const loaded = (this.props.friends && this.props.friends.length) || 0
		const toBeLoaded = (this.state.page + 2) * this.state.count
		return loaded < toBeLoaded && toBeLoaded <= this.state.maxToLoad
	}

	handleSelectChange(e) {
		const friends =
			e.target.value.length && this.props.friends.length
				? this.props.friends.filter(row => row.gender === e.target.value)
				: this.props.friends
		this.setState({
			friends,
			genderFilter: e.target.value.length ? e.target.value : null,
		})
	}

	handleSearchChange() {
		this.setState({
			search: this.searchInput.value.length ? this.searchInput.value : null,
		})
		this.props.searchFriends(this.searchInput.value)
	}

	render() {
		const page = this.state.page + 1
		const begin = this.state.page * this.state.count
		const end = page * this.state.count
		const rows = this.state.friends.slice(begin, end).map((row, i) =>
			<tr key={i}>
				<td>
					{row.name}
				</td>
				<td>
					{row.surname}
				</td>
				<td>
					{row.age}
				</td>
				<td>
					{row.gender}
				</td>
				<td>
					{row.birthDate}
				</td>
			</tr>
		)
		return (
			<section className="friends-table card card--fluid">
				<table className="table table-striped table-hover">
					<thead>
						<tr>
							<th>Name</th>
							<th>Last name</th>
							<th>Age</th>
							<th>Gender</th>
							<th>Birth date</th>
						</tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
				<footer>
					<button className="btn btn-default" onClick={() => this.handlePrev()}>
						{`<`}
					</button>
					<span className="friends-table__visibleRows">{`${begin +
						1} - ${end}`}</span>
					<button className="btn btn-default" onClick={() => this.handleNext()}>
						{`>`}
					</button>
					<span className="friends-table__filter">
						Gender:
						<select
							className="form-control friends-table__select"
							onChange={e => this.handleSelectChange(e)}
						>
							<option value="" />
							<option value="female">Female</option>
							<option value="male">Male</option>
						</select>
					</span>
					<span className="friends-table__filter">
						Search:
						<input
							className="form-control friends-table__search"
							type="text"
							onChange={() => this.handleSearchChange()}
							ref={node => (this.searchInput = node)}
						/>
					</span>
				</footer>
			</section>
		)
	}
}

FriendsTable.protoTypes = {
	friends: PropTypes.array,
	loadMoreRows: PropTypes.func.isRequired,
	searchFriends: PropTypes.func.isRequired,
}

export default FriendsTable
