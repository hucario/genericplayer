/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Album, Artist, Extension, Song } from '../../ext/Extension';
import AlbumElem from '../../components/album/'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'

import sty from './artistdetail.module.css'

import ColorThief from 'colorthief'
import { connect } from 'react-redux';
import { setCurrentlyPlaying } from '../../redux/actions';

import Accordion from '../../components/accordion/'
import ArtistImage from '../../components/artistimg/'

import {
	cachedFetch,
	cachedItem,
	setCachedItem
} from '../../cachedItems'

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

function ArtistPage(props) {
	const [data, setData] = useState();
	const [triedLoad, setTriedLoad] = useState(false)
	const [doColorThief, setColorThief] = useState(true)
	const [failed, setFailed] = useState(false)

	const [imgRef] = useState(React.createRef()); 
	const [gradCol, setGradCol] = useState()

	const [items, setItems] = useState();

	if (props?.match?.params?.id && !triedLoad) {
		const idSegs = props.match.params.id.toString().split(':');
		switch(idSegs[0].toLowerCase()) {
			case "pandora":
				(async () => {
					let possibleCached = cachedItem(props.match.params.id.toString())
					if (possibleCached) {
						setData(possibleCached);
						setItems(possibleCached.topTracks);
						setColorThief(true);
						setFailed(false); 
						return;
					}
					let yeah = "AR:";
					if (isNaN(idSegs[1])) { 
						// seo token, not a pandora id (which are all numeric)
						// probably flimsy method but I'll handle the edge cases Later:tm:
						yeah = "";
					}

					let gamer = await fetch("https://pandora.com/artist/"+yeah+idSegs[1]);
					gamer = await gamer.text();
					gamer = gamer.match(/.*storeData.*/gi)[0];
					gamer = gamer.substring(20, gamer.length-1);
					gamer = JSON.parse(gamer);
					console.log(gamer);

					const artistDetails = gamer["v1/music/artist"][0];

					let icon = artistDetails.art;
					if (icon && icon.length > 0) {
						icon = icon[icon.length-1].url;
					} else {
						if (artistDetails.discography) {
							const rDisc = artistDetails.discography.slice(0);
							rDisc.reverse();
							rDisc.some((e) => {
								icon = e.art;
								return e.art !== undefined;
							})
							if (icon) {
								icon = icon[icon.length-1].url;
							} else {
								icon = "/defaultAvatar.png"
							}
						}
					}

					const newD = new Artist({
						name: artistDetails.name,
						icon: icon,
						id: props.match.params.id,
						discography: gamer["v1/music/artist"][0].discography.map((e) => {
							return cachedItem('pandora:' + e.pandoraId.split(':')[1]) || setCachedItem(new Album({
								id: 'pandora:' + e.pandoraId.split(':')[1],
								title: e.albumTitle,
								icon: (e.art && e.art.length>0 ? e.art[e.art.length-1].url : ''),
								sauce: new Extension({
									colors: {
										normal: '#342ac0',
										hover: '#1659a5'
									},
									icon: '/pandora.png'
								}),
							}))
						}),
						sauce: cachedItem('pandoraExt') || setCachedItem(new Extension({
							colors: {
								normal: '#342ac0',
								hover: '#1659a5'
							},
							icon: '/pandora.png',
							id: 'pandoraExt'
						})),
						topTracks: gamer["v4/catalog/getDetails"][0].artistDetails.topTracks.map((e, i) => {
							e = gamer["v4/catalog/annotateObjects"][0][e];

							return cachedItem('pandora:' + e.pandoraId.split(':')[1]) || setCachedItem(new Song({
								num: i,
								title: e.name,
								album: cachedItem('pandora:' + e.albumId) || setCachedItem(new Album({
									id: 'pandora:' + e.albumId,
									title: e.albumName.replace(/\(single\)/gi, ''),
									icon: 'https://cont.p-cdn.us/' + e.icon.artUrl,
									sauce: new Extension({
										colors: {
											normal: '#342ac0',
											hover: '#1659a5'
										},
										icon: '/pandora.png'
									})
								})),
								length: fancyTimeFormat(e.duration),
								id: 'pandora:' + e.pandoraId.split(':')[1],
								sauce: cachedItem('pandoraExt') || setCachedItem(new Extension({
									colors: {
										normal: '#342ac0',
										hover: '#1659a5'
									},
									icon: '/pandora.png',
									id: 'pandoraExt'
								}))
							}))
						}),
						topAlbums: gamer["v4/catalog/getDetails"][0].artistDetails.topAlbums.map((e, i) => {
							e = gamer["v4/catalog/annotateObjects"][0][e];

							return cachedItem('pandora:' + e.pandoraId.split(':')[1]) || setCachedItem(new Album({
								id: 'pandora:' + e.pandoraId.split(':')[1],
								title: e.name,
								icon: e.icon.artUrl,
								sauce: new Extension({
									colors: {
										normal: '#342ac0',
										hover: '#1659a5'
									},
									icon: '/pandora.png'
								})
							}))
						})
					})

					newD.topTracks = newD.topTracks.map(e => {
						e.artist = newD;
						e.album.artist = newD;
						return e;
					})

					newD.topAlbums = newD.topAlbums.map(e => {
						e.artist = newD;
						return e;
					})
					newD.discography = newD.discography.map(e => {
						e.artist = newD;
						return e;
					})
					setCachedItem(newD);
					setData(newD);
					setItems(newD.topTracks);
					setColorThief(true);
					setFailed(false); 
				})().catch(() => {
					setFailed(true);
				});
				break;
			default:
				setFailed(true);
				break;
		}
		setTriedLoad(true)
	}


	useEffect(() => {
		if (imgRef.current && !gradCol && data) {
			if (imgRef.current.complete) {
				try {
					setGradCol(colorThief.getColor(imgRef.current));
				} catch(e) {
					setGradCol([255, 255, 255]);
				}
			} else {
				imgRef.current.addEventListener('load', function() {
					try {
						setGradCol(colorThief.getColor(imgRef.current));
					} catch(e) {
						setGradCol([255, 255, 255]);
					}
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
				<h1>Sorry, we couldn't find that artist.</h1>
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
					<span className={sty.type}>ARTIST</span>
					<span className={sty.albName}></span>
					<span className={sty.artName}></span>
				</div>
			</div>
			<div className={sty.actionBar} />
		</>)
	}

	let trs = [];
	items.forEach((e, i) => {
		trs.push(<tr className={sty.tr} key={i} onClick={() => {
			props.play(e)
		}}>
			<td className={sty.td}>
				<span className={sty.tdplay} />
				<span className={sty.tdnum}>{e.num+1}</span>
			</td>
			<td className={sty.td}>
				<div className={sty.tdGroup}>
					<span className={sty.sName}>{e.title}</span>
					<span className={sty.aName}>{e.artist.name}</span>
				</div>
			</td>
			<td className={sty.td}>{e.length}</td>
		</tr>)
	})

	let disc = [];
	data.discography.forEach((e, i) => {
		disc.push(<AlbumElem
			sauce={e}
			key={i}
			style={{
				alignSelf: "start"
			}}
		/>)
	});
	return (<>
		<Helmet>
			<title>{data.name + " - GenericPlayer"}</title>
		</Helmet>
		<div className={sty.head} style={{
			"--gradcol": (gradCol?`rgb(${gradCol[0]},${gradCol[1]},${gradCol[2]})`:`transparent`)
		}}>
			<ArtistImage className={sty.img} src={data.icon} alt="" ref={imgRef} crossOrigin="anonymous"/>
			<div className={sty.align}>
				<span className={sty.type}>ARTIST</span>
				<span className={sty.albName}>{data.name}</span>
			</div>
		</div>
		<div className={sty.actionBar} />
		<div className={sty.padder}>
		<Accordion
			header="Top songs"
			openLevel={0.5}
		>
			<table className={sty.songs}>
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
		</Accordion>
		<Accordion
			header="Discography"
			openLevel={1}
			direction="horizontal"
		>{disc}</Accordion>
		</div>
	</>)
}


const cAPage = connect(
	(state) => ({
		failSearch: state.failSearch
	}),
	(dispatch) => ({
		play: song => {dispatch(setCurrentlyPlaying(song))}
	})
)(ArtistPage)

export default cAPage;