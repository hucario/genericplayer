/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
	Ref,
	useEffect,
	useState
} from 'react'

import AlbumElem from '../../components/album'
import Accordion from '../../components/accordion'

import { Album, Artist, Song } from '../../ext/Extension';

import sty from './search.module.css'
import { Helmet } from 'react-helmet';

import {
	cachedSearch,
	cachedItem,
	setCachedItem
} from '../../cachedItems'

// I'm lazy, so see here:
// https://stackoverflow.com/a/11486026/11726576
function fancyTimeFormat(duration: number): string
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

export default function SearchPage(props: any): JSX.Element {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [setSearchTermFromParams, longFuncName] = useState<boolean>(false)
	const [debounceId, setDebounceId] = useState<number | undefined>();
	const [searchResults, setSearchResults] = useState<Array<{
		icon: {
			artUrl: string
		},
		type: string,
		name: string,
		artistName: string,
		pandoraId: string,
		trackCount: number,
		artistId: string,
		trackNumber: number,
		albumId: string,
		albumName: string,
		duration: number
	}>>([]);
	const [isLoading, setLoading] = useState(false);


	const debouncedSearch = (term: string) => {
		if (debounceId) {
			clearTimeout(debounceId);
		}
		setDebounceId(window.setTimeout(() => {
			setLoading(true);
			props?.history?.replace({ pathname: `/search/${term}`})
			cachedSearch(term).then((b) => {
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
		  artists: [] = [],
		  songs = [];

	
	let yeah:number = 0;

	for (let p of searchResults) {
		if (!p || (p.type && (p.type === 'LI' || p.type === 'PL'))) {
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
					key={yeah++}
					sauce={
						cachedItem('pandora:' + p.pandoraId.split(':')[1]) ??
						setCachedItem(new Album({
							title: p.name,
							icon: 'https://content-images.p-cdn.com/' + p?.icon?.artUrl,
							len: p.trackCount,
							id: 'pandora:'+p.pandoraId.split(':')[1],
							artist: cachedItem('pandora:'+p.artistId.split(':')[1]) ??
							setCachedItem(new Artist({
								name: p.artistName,
								id: 'pandora:'+p.artistId.split(':')[1],
								complete: false,
								extension: cachedItem('pandoraExt')
							})),
							complete: false,
							extension: cachedItem('pandoraExt') // if it doesn't have it you're beansed anyways
						}))
					}
				/>
			))
		} else if (p.type === 'TR') {
			songs.push(cachedItem('pandora: ' + p.pandoraId.split(':')[1]) ?? setCachedItem(new Song({
				num: p.trackNumber,
				title: p.name,
				artist: cachedItem('pandora:' + p.artistId.split(':')[1]) ?? setCachedItem(new Artist({
					name: p.artistName,
					id: 'pandora:' + p.artistId.split(':')[1],
					complete: false,
					extension: cachedItem('pandoraExt')
				})),
				album: cachedItem('pandora:' + p.albumId.split(':')[1]) ?? setCachedItem(new Album({
					title: p.albumName,
					id: 'pandora:' + p.albumId.split(':')[1],
					complete: false,
					artist: cachedItem('pandora:'+p.artistId.split(':')[1]),
					extension: cachedItem('pandoraExt')
				})),
				length: fancyTimeFormat(p.duration),
				id: 'pandora:' + p.pandoraId.split(':')[1],
				icon: 'https://content-images.p-cdn.com/' + p?.icon?.artUrl,
				extension: cachedItem('pandoraExt'),
				complete: true
			})));
		}
	}

	const trs: any[] = []

	
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
				onChange={(e: any) => {
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

function SearchBar(props: {
	wrapClassName?: string,
	id?: string,
	ref?: Ref<HTMLInputElement> | null,
	className?: string,
	value: string,
	onChange: any
}) {
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