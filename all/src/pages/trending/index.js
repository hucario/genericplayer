/* eslint-disable react-hooks/exhaustive-deps */
import React, {
	useEffect,
	useState
} from 'react'

import sty from './trending.module.css'
import {
	Song,
	Extension,
	Album,
	Artist
} from '../../ext/Extension'
import { Helmet } from 'react-helmet'
import { cachedFetch } from '../../cachedItems'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setCurrentlyPlaying } from '../../redux/actions'


// https://stackoverflow.com/a/11486026/11726576
function fancyTimeFormat(duration)
{   
    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

function altFormat(url, size) {
	if (!url) {
		return; 
	} else {
		return url.split('/').map((e, i) => {
			return (i === url.split('/').length-1?e.replace(/500/g, '250'):e);
		}).join('/');
	}
}

const ALLOW_EXPLICIT = false;
const HOW_MANY_INCREMENT = 10;


function TrendingPage(props) {
	const [data, setData] = useState([])
	const [elems, setElems] = useState([])
	const [featured, setFeatured ] = useState({})
	const [howMany, setHowMany] = useState(HOW_MANY_INCREMENT);
	const [resetTable, resetTableF] = useState(false);
	//#region Fetch & process tracks 
	useEffect(() => {
		(async() => {
			if (data.length > 0) {
				return;
			}
			let trendingData = await fetch("https://www.pandora.com/playlist/PL:562949997174247:1756780791");
			trendingData = await trendingData.text();
			trendingData = trendingData.match(/.*storeData.*/gi)[0];
			trendingData = trendingData.substring(20, trendingData.length-1);
			trendingData = JSON.parse(trendingData);
			let n = trendingData["v4/catalog/annotateObjects"][0]
			for (let e in n) {
				if (!(ALLOW_EXPLICIT || (n[e].explicitness === "NONE"))) {
					delete n[e];
				}
			}

			let tracks = trendingData["v7/playlists/getTracks"][0].tracks;

			tracks = tracks.map((e) => {
				return n[e.trackPandoraId]
			}).filter((e) => {
				return !!e; // yeets undefined and null
			}).map((e, i) => {
				return new Song({
					num: i + 1,
					title: e.name,
					artist: new Artist({
						name: e.artistName,
						id: 'pandora:' + e.artistId.split(':')[1]
					}),
					album: new Album({
						title: e.albumName,
						id: 'pandora:' + e.albumId.split(':')[1],
						icon: 'https://content-images.p-cdn.com/' + e.icon.artUrl,
						artist: new Artist({
							name: e.artistName,
							id: 'pandora:' + e.artistId.split(':')[1]
						}),
						sauce: new Extension({
							colors: {
								normal: '#342ac0',
								hover: '#1659a5'
							},
							icon: '/pandora.png'
						})
					}),
					length: fancyTimeFormat(e.duration),
					id: 'pandora:' + e.pandoraId.split(':')[1]
				})
			});


			let mostPopular = tracks.shift();
			resetTableF(true);
			setFeatured(mostPopular)
			setData(tracks);
		})()
	}, [])
	//#endregion
	//#region Create and store table elements
	useEffect(() => {
		let tElems = (resetTable?[]:elems);
		let tData = data.slice(howMany - HOW_MANY_INCREMENT, howMany)
		tData.forEach((e, i) => {
			tElems.push(<div 
				className={sty.tr} 
				key={i} 
				onClick={() => {
					props.play(e)
				}}
				style={{
					"--bg": `url("${altFormat(e.album?.icon, 100)}")`
				}}
			>
				<div className={sty.td}>
					<span className={sty.tdplay} />
					<span className={sty.tdnum}>{e.num}</span>
				</div>
				<div className={sty.td}>
					<div className={sty.tdGroup}>
						<span className={sty.sName}>{e.title}</span>
						<Link to={
							e.artist && e.artist.id ? 
								'/artist/' + e.artist.id :
								''
						} className={sty.aName}>{e.artist.name}</Link>
					</div>
				</div>
				<div className={sty.td}>{e.length}</div>
			</div>)
		})
		if (resetTable) {
			resetTableF(false);
		}
		setElems(tElems);
	}, [data, howMany])
	//#endregion

	
	return (<>
		<Helmet>
			<title>Trending - GenericPlayer</title>
		</Helmet>
		<div className={sty.full}>
			<div className={sty.numOnePopular} style={{
				"--bgimg": 'url(\'' + (featured?.album?.icon || '') + '\')'
			}}>
				<div className={sty.align}>
					<h4>TRENDING ON PANDORA</h4>
					<h1><Link to={'/album/' + featured?.album?.id}>{featured?.title}</Link></h1>
					<h3><Link to={'/artist/' + featured?.artist?.id}>{featured?.artist?.name}</Link></h3>
				</div>
			</div>
			<div className={sty.table}>
				<div className={sty.tbody}>{elems}</div>
				{(data.length > elems.length && <button className={sty.greeny} onClick={() => {
					setHowMany(howMany + HOW_MANY_INCREMENT);
				}}>Show More</button>)}
			</div>
		</div>
	</>)
}

const cTPage = connect(
	(state) => ({
		failSearch: state.failSearch
	}),
	(dispatch) => ({
		play: song => {dispatch(setCurrentlyPlaying(song))}
	})
)(TrendingPage)

export default cTPage;