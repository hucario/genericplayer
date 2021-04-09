import React, {
	useEffect,
	useState
} from 'react'

import sty from './trending.module.css'
import Accordion from '../../components/accordion/'
import AlbumElem from '../../components/album/'

import {
	Song,
	Extension,
	Album,
	Artist
} from '../../ext/Extension'
import { Helmet } from 'react-helmet'
import cachedFetch from '../../cachedFetch'
import { Link } from 'react-router-dom'


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

const ALLOW_EXPLICIT = false;

function altFormat(url, size) {
	url = url.split('/');
	url.pop();
	url = url.join('/');
	url += '/' + size + 'x' + size + '.png';
	return url;
}

export default function StationsPage() {
	const [data, setData] = useState([])
	const [elems, setElems] = useState([])
	const [featured, setFeatured ] = useState({})
	useEffect(() => {
		(async() => {
			let tElems = [];
			let tData = [];

			let trendingData = await cachedFetch("https://www.pandora.com/playlist/PL:562949997174247:1756780791");
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
			})

			let mostPopular = tracks.shift();

			console.log(tracks, mostPopular);
			setFeatured(new Song({
				num: mostPopular.trackNumber,
				title: mostPopular.name,
				artist: new Artist({
					name: mostPopular.artistName,
					id: 'pandora:' + mostPopular.artistId.split(':')[1]
				}),
				album: new Album({
					title: mostPopular.albumName,
					id: 'pandora:' + mostPopular.albumId.split(':')[1],
					icon: 'https://content-images.p-cdn.com/' + mostPopular.icon.artUrl,
					artist: new Artist({
						name: mostPopular.artistName,
						id: 'pandora:' + mostPopular.artistId.split(':')[1]
					}),
					sauce: new Extension({
						colors: {
							normal: '#342ac0',
							hover: '#1659a5'
						},
						icon: '/pandora.png'
					})
				}),
				length: fancyTimeFormat(mostPopular.duration),
				id: 'pandora:' + mostPopular.pandoraId.split(':')[1]
			}))
			setData(tData);
		})()
	}, [])
	
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
		</div>
	</>)
}