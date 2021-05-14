import React from 'react';
import { connect } from 'react-redux'
import sty from './bottombar.module.css'
import AlbImg from '../albimg/'

const BottomBar = function(props) {
	const isEmpty = !(props.sauce?.album?.title || props.sauce?.song?.title || props.sauce?.artist?.name)
	const extension = props.sauce?.album?.sauce || props.sauce?.album?.extension;
	const playState = props.playState;
	return (
		<section className={sty.bar} style={{
			"--bg": extension?.colors?.normal,
			"--bghover": extension?.colors?.hover || extension?.colors?.normal
		}}>
			<div className={[sty.infoGroup, playState.loading && sty.loading].join(' ')} style={{
				opacity: (isEmpty ? 0 : 1),
				pointerEvents: (isEmpty ? 'none' : 'auto')
			}}>
				<AlbImg 
					src={props.sauce?.album?.icon ?? ""}
					className={sty.albImg}
					alt={(props.sauce?.album?.title ? "Album cover for " + props.sauce.album.title : '')}
				/>
				<div className={sty.align}>
					<span className={sty.songName}>{props.sauce?.song?.title}</span>
					<span className={sty.artistName}>{props.sauce?.artist?.name}</span>
				</div>
			</div>
		</section>
	)
}

const cBottomBar = connect((state) => {
	return {sauce: state.currentlyPlayingInfo, playState: state.playState}
})(BottomBar);

export default cBottomBar;