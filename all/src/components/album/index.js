/* eslint-disable jsx-a11y/anchor-is-valid */
import sty from'./album.module.css'
import { setCurrentlyPlayingAlbum, setFailSearch } from '../../redux/actions/index'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import AlbImg from '../albimg'

function Station(props) {
	return (<div className={sty.album+(props.className?' '+props.className:'')} style={{
		"--bg": props.sauce.sauce.colors.normal ?? 'black',
		"--bghover": props.sauce.sauce.colors.hover ?? props.sauce.sauce.colors.normal ?? 'black',
		...props.style
	}}>
		<Link className={sty.eventCatcher} to={'/album/'+props.sauce.id} onClick={() => {
			props?.setFailSearch(props.sauce.title + (props.sauce.artist?.name?' ' + props.sauce.artist?.name:''))
		}} />
		<div className={sty.albumInner}>
			<div className={sty.imgHolder}>
				<img src={props.sauce.sauce.icon} alt="" className={sty.sauceindicator} />
				<AlbImg src={props.sauce.icon} className={sty.albicon} alt=""/>
				<button className={'bx bx-play '+sty.play} 
					onClick={() => {
						props?.play(props.sauce);
					}}
				/>
			</div>
			<div className={sty.infoHolder}>
				<Link 
					className={sty.h1} 
					title={props.sauce.title} 
					to={'/album/' + props.sauce.id}
					onClick={() => {
						props?.setFailSearch(props.sauce.title + (props.sauce.artist?.name?' ' + props.sauce.artist?.name:''))
					}}
				>{props.sauce.title}</Link>
				<Link className={sty.sub} title={props.sauce.artist?.name} to={'/artist/' + props.sauce.artist.id}>{props.sauce.artist?.name}</Link>
			</div>
		</div>
	</div>)
}

const cStation = connect(
	null,
	(dispatch) => ({
		play: song => {dispatch(setCurrentlyPlayingAlbum(song))},
		setFailSearch: term => {dispatch(setFailSearch(term))}
	})
)(Station)

export default cStation;