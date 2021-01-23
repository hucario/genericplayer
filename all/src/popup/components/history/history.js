import React from 'react';

class HistoryItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
		if (!this.props.info) {
			throw new Error("Missing prop 'info'");
		}
		this.state.rating = this.props.info.getRating();
	}
	like = () => {
		this.setState({
			rating: (this.state.rating==='liked'?'unrated':'liked') // preview, so you don't have to wait for ping
			// if it doesn't work, then it'll just undo itself below
		})
		this.props.info.like().then((e) => {
			this.setState({
				rating: e
			});
		})
	}
	dislike = () => {
		this.setState({
			rating: (this.state.rating==='disliked'?'unrated':'disliked') // preview, so you don't have to wait for ping
			// if it doesn't work, then it'll just undo itself below
		})
		this.props.info.dislike().then((e) => {
			this.setState({
				rating: e
			});
		})
	}
	render() {
		let tHI = this.props.info; // shorthand
		return (<li className='hI'>
		<img 
			src={tHI.album.coverUrl ?? ''}
			alt={String.fromCodePoint(0xec5b)}
			title={'Album art for '+ tHI.album.name}
		/>
		<div className="historyAaa">
			<span 
				className="historyName"
			>{tHI.name}</span>
			<span>{tHI.album.name}</span>
			<span>{tHI.artist.name}</span>
			<div
				className="historyButtons"
			>
				<button
					className={`bx ${tHI.getRating() === 'liked'?'bxs-like':'bx-like'}`}
					onClick={this.like}
				 />
				<button
					className='bx bxs-download'
					onClick={tHI.download}
					/>
				<button
					className={`bx ${tHI.getRating() === 'disliked'?'bxs-dislike':'bx-dislike'}`}
					onClick={this.dislike}
					/>
			</div>
		</div>
	</li>)
	}
}

export default class History extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			extension: props.activeExtension,
			history: []
		}
		this.state.extension.addSetHistoryCb(this.setHistory);
	}
	setHistory = (hist) => {
		this.setState({
			history: hist
		})
	}
	render() {
		let gaming = [];
		for (let i = 0; i < this.state.history.length; i++) {
			gaming.push(
				<HistoryItem 
					info={this.state.history[i]} 
					key={i} 
				/>)
		}
		return (
			<ol id="history">
				{gaming}
			</ol>
		)
	}
}
