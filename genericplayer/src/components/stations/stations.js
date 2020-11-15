import React from 'react'
// @ts-expect-error
import styles from './stations.module.css'

export default class Stations extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeExtension: this.props.activeExtension
		}
		this.props.activeExtension.Extension.getStations()
		.then((e) => {
			this.setState({
				stations: e
			})
		})
		.catch((e) => {
			this.props.onerror(e);
		})
	}
	render() {
		if (!this.state.stations) {
			return (
				<ul className={styles.stations} />
			)
		}
		let ch = []
		for (let i = 0; i < this.state.stations.length; i++) {
			ch.push(<StationElement data={this.state.stations[i]} />) 
		}
		return (
			<ul
				className={styles.stations}
			>
				{ch}
			</ul>
		)
	}
}

class StationElement extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.data
		}
		if (!this.state.data) {
			throw new Error("No data provided.")
		}
	}
	render() {
		return (
			<li>
				<img 
					src={this.state.data.latestCover} 
					alt={JSON.stringify(this.state.data) }
				/>
				{this.state.data.name}
			</li>
		)
	}

}