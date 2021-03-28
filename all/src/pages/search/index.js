/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
	useEffect,
	useState
} from 'react'

import AlbumElem from '../../components/album/'
import Accordion from '../../components/accordion'

import { Album, Artist, Extension, Song } from '../../ext/Extension';

import sty from './search.module.css'
import { Helmet } from 'react-helmet';

import store from '../../redux/store'
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

async function search(term) {
	let p = await cachedFetch("https://www.pandora.com/api/v3/sod/search", {
	headers: {
		"content-type": "application/json"
	},
		"body": "{\"query\":\""+term+"\",\"types\":[\"AL\",\"AR\",\"CO\",\"TR\",\"SF\",\"PL\",\"ST\",\"PE\"],\"listener\":null,\"start\":0,\"count\":30,\"annotate\":true,\"searchTime\":0,\"annotationRecipe\":\"CLASS_OF_2019\"}",
		"method": "POST",
	});
	p = JSON.parse(p);
	let m = [];
	p.results && p.results.forEach(e => {
		m.push(p.annotations[e]);
	})

	return m;
}

export default function SearchPage(props) {
	const [searchTerm, setSearchTerm] = useState('');
	const [setSearchTermFromParams, longFuncName] = useState(false)
	const [debounceId, setDebounceId] = useState();
	const [searchResults, setSearchResults] = useState([]);
	const [isLoading, setLoading] = useState(false);


	const debouncedSearch = (term,resfunc) => {
		const state = store.getState();
		const url = "https://www.pandora.com/api/v3/sod/search";
		const options = {
			headers: {
				"content-type": "application/json"
			},
			"body": "{\"query\":\""+term+"\",\"types\":[\"AL\",\"AR\",\"CO\",\"TR\",\"SF\",\"PL\",\"ST\",\"PE\"],\"listener\":null,\"start\":0,\"count\":30,\"annotate\":true,\"searchTime\":0,\"annotationRecipe\":\"CLASS_OF_2019\"}",
			"method": "POST",
		}
		if (state.cachedReqs[url] && state.cachedReqs[url][JSON.stringify(options)]) {
			let p = state.cachedReqs[url][JSON.stringify(options)];
			p = JSON.parse(p);
			let m = [];
			p.results && p.results.forEach(e => {
				m.push(p.annotations[e]);
			})
			props?.history?.replace({ pathname: `/search/${term}`})
			setSearchResults(m);
			setLoading(false);
			return;
		}
		if (debounceId) {
			clearTimeout(debounceId);
		}
		setDebounceId(setTimeout(() => {
			setLoading(true);
			props?.history?.replace({ pathname: `/search/${term}`})
			search(term).then((b) => {
				setSearchResults(b);
				setLoading(false);
			});
		}, 250))
	}

	if (!setSearchTermFromParams && props?.match?.params?.id) {
		longFuncName(true);
		setSearchTerm(props.match.params.id);
		debouncedSearch(props.match.params.id)
	}

	let resultstitles = [];
	let resultsauthors = [];
	
	const albums = [],
		  artists = [],
		  songs = []


	for (let p of searchResults) {
		if (p.type && (p.type === 'LI' || p.type === 'PL')) {
			continue;
		}
		if (resultstitles.indexOf(p.name) !== -1 && (resultsauthors[resultstitles.indexOf(p.name)] === p.artistName)) {
			continue;
		}
		resultstitles.push(p.name);
		resultsauthors.push(p.artistName);
		if (p.type === 'AL') {
			albums.push((
				<AlbumElem
					sauce={
						new Album({
							title: p.name,
							icon: 'https://content-images.p-cdn.com/' + p?.icon?.artUrl,
							len: p.trackCount,
							id: 'pandora:'+p.pandoraId.split(':')[1],
							artist: new Artist({
								name: p.artistName,
								id: 'pandora:'+p.artistId.split(':')[1]
							}),
							sauce: new Extension({
								colors: {
									normal: '#342ac0',
									hover: '#1659a5'
								},
								icon: '/pandora.png'
							})
						})
					}
				/>
			))
		} else if (p.type === 'TR') {
			songs.push(new Song({
				num: p.trackNumber,
				title: p.name,
				artist: new Artist({
					name: p.artistName,
					id: p.artistId
				}),
				album: new Album({
					title: p.albumName,
					id: p.albumId
				}),
				length: fancyTimeFormat(p.duration),
				id: p.pandoraId,
				icon: 'https://content-images.p-cdn.com/' + p?.icon?.artUrl
			}));
		}
	}

	const trs = []

	
	songs.forEach((e, i) => {
		trs.push(<tr className={sty.tr} key={i} onClick={() => {
				props.play && props.play(e)
			}}>
			<td className={sty.td}>
				<span className={sty.tdplay} />
				<img className={sty.tdnum} src={e.icon} alt="" />
			</td>
			<td className={sty.td}>
				<div className={sty.tdGroup}>
					<span className={sty.sName}>{e.title}</span>
					<a href="#" className={sty.aName}>{e.artist.name}</a>
				</div>
			</td>
			<td className={sty.td}>{e.length}</td>
		</tr>)
	})


	return (
		<>
			{searchTerm && <Helmet>
				<title>{searchTerm + ' - GenericPlayer'}</title>
			</Helmet>}
			<SearchBar 
				value={searchTerm}
				onChange={(e) => {
					setSearchTerm(e.target.value);
					debouncedSearch(e.target.value);
				}}
			/>
			{searchResults.length > 0 && 
			<div className={sty.resultsWrap}>
				{isLoading && <div className={sty.loader} />}
				{albums.length > 0 && 
				<Accordion 
					style={{
						paddingLeft: "2rem"
					}}
					header="Albums"
					className={sty.albums} 
					openLevel={1}
				>
					{albums}
				</Accordion>}
				{artists.length > 0 && <>
					<h2 style={{
						marginTop: "2rem",
						marginLeft: "2rem"
					}}>Artists</h2>
					<div className={sty.artists}>
						{artists}
					</div>
				</>}
				{songs.length > 0 && <>
					<h2 style={{
						marginTop: "2rem",
						marginLeft: "2rem"
					}}>Songs</h2>
					<table className={sty.songs}>
						<tbody className={sty.tbody}>{trs}</tbody>
					</table>
				</>}
			</div>}

		</>
	)
}

function SearchBar(props) {
	const [id] = useState('SEARCH_' + Math.floor(Math.random()*100000).toString(16))
	useEffect(() => {
		document.getElementById(id)?.focus();
	})
	return (
		<div className={sty.searchBarWrap + (props?.wrapClassName?' '+props.wrapClassName:'')}>
			<label className={sty.label} htmlFor={props?.id || id} ><i className={'bx bx-search '+sty.icon} /></label>
			<input
				{...props}
				ref={props.ref}
				className={sty.searchBar + (props?.className?' '+props.className:'')}
				spellCheck="false"
				placeholder="Search for songs, artists, or albums."
				id={props?.id || id}
			/>
		</div>
	)
}