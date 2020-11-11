import React from 'react';

class History extends React.Component {
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
				let tHI = prevSongs[i]; // this history item
				
				gaming.push((
					<li className='hI'>
						<img 
							src={prevSongs[i].album.coverUrl.includes('/')?prevSongs[i].album.coverUrl:''}
							alt={'Album art for '+ prevSongs[i].album.name}
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
					</li>
				))
			}
		return (
			<ol id="history">
				{gaming}
			</ol>
		)
	}
}

export default History;