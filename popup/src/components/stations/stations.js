import React from 'react'
// @ts-expect-error
import styles from './stations.module.css'

export default class Stations extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeExtension: this.props.ext,
			stations: this.props.stations
		}
		if (!this.props.stations || (this.props.stations && this.props.stations.length === 0)) {
			console.log('getting stations')
			this.props.activeExtension.getStations()
			.then((e) => {
				this.setState({
					stations: e
				})
			})
			.catch((e) => {
				this.props.onerror(e);
			})
		} else {
			console.log('yay for stations', this.state.stations)
		}
	}
	render() {
		if (!this.state.stations) {
			return (
				<ul className={styles.stations} />
			)
		}
		let ch = []
		for (let i = 0; i < this.state.stations.length; i++) {
			ch.push(
				<StationElement 
					data={this.state.stations[i]} 
					ext={this.state.activeExtension}
					key={i}
					goToPage={this.props.goToPage || function(){}}
				/>
			) 
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
			data: this.props.data,
			ext: this.props.ext
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
					alt={this.state.data.name}
					title={this.state.data.name}
					style={{
						color: ['white', 'red', 'orange', 'yellow', 'green', 'blue', 'purple'][Math.floor(Math.random()*7)]
					}}
				/>
				<button
					className={styles.name}
					onClick={
						(() => {
							this.state.ext.playStation(this.state.data).then(() => {
								this.props.goToPage(1);
							})
						})
					}
				>{this.state.data.name}</button>
			</li>
		)
	}

}