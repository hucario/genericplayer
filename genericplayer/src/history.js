import React from 'react';

class HistoryItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
		if (this.props.info) {
			this.state.info = this.props.info;
		} else {
			throw new Error("Missing prop 'info'");
		}
	}
	render() {
		let tHI = this.state.info; // shorthand
		return (<li className='hI'>
		<img 
			src={tHI.album.coverUrl.includes('/')?tHI.album.coverUrl:'invalid url'}
			alt={'Album art for '+ tHI.album.name}
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
					className={`bx ${tHI.rating === 'liked'?'bxs-like':'bx-like'}`}
					onClick={tHI.like}
				 />
				<button
					className='bx bxs-download'
					onClick={tHI.download}
					/>
				<button
					className={`bx ${tHI.rating === 'disliked'?'bxs-dislike':'bx-dislike'}`}
					onClick={tHI.dislike}
					/>
			</div>
		</div>
	</li>)
	}
}

export default class History extends React.Component {
	constructor(props) {
		super(props);
		this.setState({
			extension: props.activeExtension
		})
	}
	likeSong() {

	}
	render() {
		let gaming = [];
		let prevSongs = this.props.activeExtension.Extension.getHistory();
		for (let i = 0; i < prevSongs.length; i++) {
			gaming.push(<HistoryItem info={prevSongs[i]} key={i} />)
		}
		return (
			<ol id="history">
				{gaming}
			</ol>
		)
	}
}