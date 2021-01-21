import React from 'react'
import styles from './stations.module.css'
import platformSpecific from '../../../browser';

export default class Stations extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeExtension: this.props.ext,
			stations: this.props.stations
		}
		if (!this.props.stations || (this.props.stations && this.props.stations.length === 0)) {
			this.props.activeExtension.getStations()
			.then((e) => {
				this.setState({
					stations: e
				})
			})
			.catch((e) => {
				this.props.onerror(e);
			})
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
			ext: this.props.ext,
			color: ['white', 'red', 'orange', 'yellow', 'green', 'blue', 'purple'][Math.floor(Math.random()*7)]
		}
	}
	render() {
		return (
			<li>
				<img 
					src={this.state.data.latestCover ?? ""}
					title={this.state.data.name}
					style={{
						color: this.state.color
					}}
				/>
				<button
					className={styles.name}
					onClick={
						(() => {
							this.state.data.play();
							this.props.goToPage(1);
						})
					}
				>{this.state.data.name}</button>
			</li>
		)
	}

}
