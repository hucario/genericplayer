import React from 'react';
import { connect } from 'react-redux'
import sty from './bottombar.module.css'

const BottomBar = function(props) {
	return (
		<section className={sty.bar} style={{
			"--bg": props?.sauce?.album?.sauce?.colors?.normal,
			"--bghover": props?.sauce?.album?.sauce?.colors?.hover || props?.sauce?.sauce?.colors?.normal
		}}>
			<div className={sty.infoGroup}>
				<img 
					src={props.sauce?.album?.icon ?? "https://is2-ssl.mzstatic.com/image/thumb/Music118/v4/24/46/97/24469731-f56f-29f6-67bd-53438f59ebcb/source/512x512bb.jpg"}
					className={sty.albImg}
					alt={"Album cover for " + (props.sauce?.album?.title ?? 'Between Dreams')}
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
	return {sauce: state.currentlyPlayingInfo}
})(BottomBar);

export default cBottomBar;