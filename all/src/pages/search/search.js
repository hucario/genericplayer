import React, {
	useState
} from 'react'
import sty from './search.module.css'
async function search(term) {
	let j = await fetch('https://itunes.apple.com/search?media=music&term=' + encodeURIComponent(term).replace(/%20/g, '+'))
	j = await j.json();
	return j.results;
}

export default function SearchPage() {
	const [searchTerm, setSearchTerm] = useState('');
	const [debounceId, setDebounceId] = useState();
	const [searchResults, setSearchResults] = useState([]);
	const [isLoading, setLoading] = useState(false);

	const debouncedSearch = (term,resfunc) => {
		if (debounceId) {
			clearTimeout(debounceId);
		}
		setDebounceId(setTimeout(() => {
			setLoading(true);
			search(term).then((b) => {
				setSearchResults(b);
				setLoading(false);
			});
		}, 250))
	}

	let results = [];
	let resultstitles = [];
	let resultsauthors = [];
	for (let p of searchResults) {
		if (resultstitles.indexOf(p.trackCensoredName) !== -1 && (resultsauthors[resultstitles.indexOf(p.trackCensoredName)] === p.artistName)) {
			continue;
		}
		console.log(resultstitles.indexOf(p.trackCensoredName), resultsauthors[resultstitles.indexOf(p.trackCensoredName)], p.trackCensoredName);
		resultstitles.push(p.trackCensoredName);
		resultsauthors.push(p.artistName);
		results.push((
			<li className={sty.result} key={results.length}>
				<img className={sty.resultImage} src={p.artworkUrl100} alt="" />
				<div className={sty.group}>
					<span className={sty.trackName}>{p.trackCensoredName}</span>
					<span className={sty.artistName}>{p.artistName}</span>
				</div>
			</li>
		))
	}

	return (
		<>
			<SearchBar 
				value={searchTerm}
				onChange={(e) => {
					setSearchTerm(e.target.value);
					debouncedSearch(e.target.value);
				}}
			/>
			<div className={sty.resultsWrap}>
				{isLoading && <div className={sty.loader} />}
				<ul className={sty.results}>
					{results}
				</ul>
			</div>
		</>
	)
}

function SearchBar(props) {
	const [id] = useState('SEARCH_' + Math.floor(Math.random()*100000).toString(16))
	return (
		<div className={sty.searchBarWrap + (props?.wrapClassName?' '+props.wrapClassName:'')}>
			<label className={sty.label} htmlFor={props?.id || id} ><i className={'bx bx-search '+sty.icon} /></label>
			<input
				{...props}
				className={sty.searchBar + (props?.className?' '+props.className:'')}
				spellCheck="false"
				placeholder="Search for songs, artists, or albums."
				id={props?.id || id}
			/>
		</div>
	)
}