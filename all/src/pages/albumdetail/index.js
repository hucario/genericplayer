/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Album, Artist, Extension, Song } from '../../ext/Extension';
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import AlbImg from '../../components/albimg/'

import sty from './albumdetail.module.css'

import ColorThief from 'colorthief'
import { connect } from 'react-redux';
import { setCurrentlyPlaying } from '../../redux/actions';
import cachedFetch from '../../cachedFetch'

// I'm lazy, so see here:
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

const colorThief = new ColorThief();
window.colorThief = colorThief;

function AlbumPage(props) {
	const [data, setData] = useState();
	const [triedLoad, setTriedLoad] = useState(false)
	const [doColorThief, setColorThief] = useState(true)
	const [failed, setFailed] = useState(false)

	if (props?.match?.params?.id && !triedLoad) {
		const idSegs = props.match.params.id.toString().split(':');
		switch(idSegs[0].toLowerCase()) {
			case "pandora":
				cachedFetch("https://www.pandora.com/api/v1/music/album", {
					method: "POST",
					headers: {
						"content-type": "application/json"
					},
					body: "{\"token\":\"AL:"+idSegs[1]+"\"}"
				}).then((p) => {
					p = JSON.parse(p);
					let newD = new Album({
						title: p.albumTitle,
						icon: p.art[p.art.length-1].url,
						len: p.tracks.length,
						artist: new Artist({
							name: p.artistName,
							id: 'pandora:' + p.artistSeoToken.split('/')[1]
						}),
						sauce: new Extension({
							colors: {
								normal: '#342ac0',
								hover: '#1659a5'
							},
							icon: '/pandora.png'
						})
					})
					let tracks = [];
					p.tracks.forEach((tr) => {
						tracks.push(new Song({
							num: tr.trackNum,
							title: tr.songTitle,
							artist: new Artist({
								name: tr.artistName,
								id: 'pandora:' + tr.artistSeoToken.split('/')[1]
							}),
							album: newD,
							length: fancyTimeFormat(tr.trackLength),
							id: 'pandora:' +tr.pandoraId.split(':')[1]
						}))
					})

					newD.items = tracks.slice(0, 10); // TODO: Settingsprovider config the amount of songs initially
					newD.getMoreItems = async (offset) => {
						return tracks.slice(offset, offset+10);
					}

					setData(newD);
					setItems(newD.items);
					setColorThief(true);
					setFailed(false);
				}).catch(async () => {
					
					let yeah = "AL:";
					if (isNaN(idSegs[1])) { 
						// seo token, not a pandora id (which are all numeric)
						// probably flimsy method but I'll handle the edge cases Later:tm:
						yeah = "";
					}

					let gamer = await cachedFetch("https://pandora.com/album/"+yeah+idSegs[1]);
					gamer = gamer.match(/.*storeData.*/gi)[0];
					gamer = gamer.substring(20, gamer.length-1);
					gamer = JSON.parse(gamer);
					const n = gamer["v4/catalog/annotateObjects"][0]
					let r;
					Object.keys(n).forEach(e => { if (e.includes('AL:')) r = e; });
					r = n[r];

					let newD = new Album({
						title: r.name.replace(/\(single\)/gi, ''),
						icon: 'https://content-images.p-cdn.com/' + r.icon.artUrl,
						len: r.tracks.length,
						artist: new Artist({
							name: r.artistName,
							id: 'pandora:' + r.artistId.split(':')[1]
						}),
						sauce: new Extension({
							colors: {
								normal: '#342ac0',
								hover: '#1659a5'
							},
							icon: '/pandora.png'
						})
					})
					let tracks = [];
					r.tracks.forEach((tr) => {
						tr = n[tr];
						tracks.push(new Song({
							num: tr.trackNumber,
							title: tr.name,
							artist: new Artist({
								name: tr.artistName,
								id: 'pandora:' + tr.artistId.split(':')[1]
							}),
							album: newD,
							length: fancyTimeFormat(tr.duration),
							id: 'pandora:' + tr.pandoraId.split(':')[1]
						}))
					})

					newD.items = tracks.slice(0, 10); // TODO: Settingsprovider config the amount of initial songs
					newD.getMoreItems = async (offset) => {
						return tracks.slice(offset, offset+10);
					}

					setData(newD);
					setItems(newD.items);
					setColorThief(true);
					setFailed(false);
				}).catch((e) => {
					setFailed(true);
				});
				break;
			default:
				setFailed(true);
				break;
		}
		setTriedLoad(true)
	}


	const [imgRef] = useState(React.createRef()); 
	const [gradCol, setGradCol] = useState()

	const [items, setItems] = useState();

	useEffect(() => {
		if (imgRef.current && !gradCol && data) {
			if (imgRef.current.complete) {
				setGradCol(colorThief.getColor(imgRef.current));
			} else {
				imgRef.current.addEventListener('load', function() {
					setGradCol(colorThief.getColor(imgRef.current));
				});
			}
		}
		if (doColorThief) {
			setColorThief(false);
		}
	}, [data, imgRef, gradCol, doColorThief])

	if (failed) {
		return (<div className={sty.full}>
			<Helmet>
				<title>GenericPlayer</title>
			</Helmet>
			<div className={sty.notFoundBG} />
			<div className={sty.full2}>
				<h1>Sorry, we couldn't find that album.</h1>
				<div className={sty.notFoundGroup}>
				<Link 
					to={'/search' + (props.failSearch?'/'+props.failSearch:'')}
					className={sty.greeny}
				>search for it</Link><Link
					to='/' 
					className={sty.greeny}
				>go home</Link>
				</div>
			</div>

		</div>)
	}
	if (!data || !items) {
		return (<>
			<div className={sty.head} style={{
				"--gradcol": "transparent"
			}}>
				<img className={sty.img} style={{
					opacity: 0
				}} src="" alt="" crossOrigin="anonymous"/>
				<div className={sty.align}>
					<span className={sty.type}>ALBUM</span>
					<span className={sty.albName}></span>
					<span className={sty.artName}></span>
				</div>
			</div>
			<div className={sty.actionBar} />
			<table className={sty.songs}>
				<thead className={sty.thead}>
					<tr className={sty.tr}>
						<th className={sty.th}>#</th>
						<th className={sty.th}>Title</th>
						<th className={sty.th}>Time</th>
					</tr>
				</thead>
				<tbody className={sty.tbody}></tbody>
			</table>
		</>)
	}

	let trs = [];
	items.forEach((e, i) => {
		trs.push(<tr className={sty.tr} key={i} onClick={() => {
			props.play(e)
		}}>
			<td className={sty.td}>
				<span className={sty.tdplay} />
				<span className={sty.tdnum}>{e.num}</span>
			</td>
			<td className={sty.td}>
				<div className={sty.tdGroup}>
					<span className={sty.sName}>{e.title}</span>
					<Link to={
						e.artist && e.artist.id ? 
							'/artist/' + e.artist.id :
							''
					} className={sty.aName}>{e.artist.name}</Link>
				</div>
			</td>
			<td className={sty.td}>{e.length}</td>
		</tr>)
	})
	return (<>
		<Helmet>
			<title>{data.title + " - GenericPlayer"}</title>
		</Helmet>
		<div className={sty.head} style={{
			"--gradcol": (gradCol?`rgb(${gradCol[0]},${gradCol[1]},${gradCol[2]})`:`transparent`)
		}}>
			<AlbImg onError={() => {
				setGradCol([255, 255, 255]);
			}} className={sty.img} src={data.icon} alt="" ref={imgRef} crossOrigin="anonymous"/>
			<div className={sty.align}>
				<span className={sty.type}>ALBUM</span>
				<span className={sty.albName}>{data.title}</span>
				<Link className={sty.artName} to={'/artist/' + data.artist?.id}>{data.artist?.name}</Link>
			</div>
		</div>
		<div className={sty.actionBar} style={{
			"--gradcol": (gradCol?`rgb(${gradCol[0]},${gradCol[1]},${gradCol[2]})`:`transparent`)
		}}>
			<button className={sty.actionButton}><i className='bx bx-play' />Play</button>
			<button className={sty.actionButton}><i className='bx bx-shuffle' />Shuffle</button>
			<button className={sty.actionButton}><i className='bx bx-add-to-queue' />Play Next</button>
			<button className={sty.actionButton}><i className='bx bx-add-to-queue' />Queue</button>
			<button className={sty.actionButton}><i className='bx bx-share' />Share</button>
			<div className={sty.actionSpacer} />
			<button className={sty.actionButton}>...</button>
		</div>
		<table className={sty.songs}>
			<thead className={sty.thead}>
				<tr className={sty.tr}>
					<th className={sty.th}>#</th>
					<th className={sty.th}>Title</th>
					<th className={sty.th}>Time</th>
				</tr>
			</thead>
			<tbody className={sty.tbody}>{trs}</tbody>
			{(data.len > items.length && <tfoot>
				<tr>
					<td className={sty.td} colSpan="3">
						<button className={sty.greeny} onClick={() => {
							data.getMoreItems(items.length).then((e) => {
								setItems(Array.prototype.concat(items, e))
							})
						}}>Show More</button>
					</td>
				</tr>
			</tfoot>)}
		</table>
	</>)
}


const cAPage = connect(
	(state) => ({
		failSearch: state.failSearch
	}),
	(dispatch) => ({
		play: song => {dispatch(setCurrentlyPlaying(song))}
	})
)(AlbumPage)

export default cAPage;