import { Song, Album, Artist, Extension } from "../../ext/Extension";
import ytsr from './../../ytsr'

const dInfo = {
	playState: {
		time: 0,
		volume: 100,
		playing: false,
		repeatMode: false,
	},
	song: new Song({
		title: "",
	}),
	album: new Album({
		sauce: new Extension({
			colors: {
				normal: '#ffffff12',
				hover: '#ffffff30'
			},
			icon: ''
		}),
		title: "",
		url: '',
		icon: ''
	}),
	artist: new Artist({
		name: "",
	}),
	failSearch: '', // used to search for latest album if it can't be found,
	cachedReqs: {},
	playlist: [],
	cachedItems: {
		pandoraExt: new Extension({
			colors: {
				normal: '#847fcc33',
				hover: '#1659a5'
			},
			incomplete: false,
			id: 'pandoraExt',
			icon: '/pandora.png'
		})
	},
	cachedSearches: {}
}
dInfo.album.artist = dInfo.artist;


export default function rootReducer(state = dInfo, action) {
	let newState = {};
	const payload = action.payload;
	Object.assign(newState, state);

	switch (action.type) {
		case "SET_CURRENTLY_PLAYING": 
			newState.currentlyPlayingInfo = {
				song: payload,
				album: payload.album,
				artist: payload.artist
			}
			ytsr(payload.title + ' ' + payload.artist?.name).then(b => {
				alert(b.items[0].snippet.title);
			});
			return newState;
		case "SET_CURRENTLY_PLAYING_ALBUM":
//			action.payload.getPlaylist().then()
			return newState;
		case "SET_FAIL_SEARCH":
			newState.failSearch = payload;
			return newState;
		case "SET_CACHED_REQ":
			// last resort
			const { url, options, result } = payload;

			newState.cachedReqs[url] =newState.cachedReqs[url] ?? {};
			newState.cachedReqs[url][JSON.stringify(options)] = result;
			// woot cached reqs now
			return newState;
		case "SET_CACHED_ITEM":
			const { id } = payload;
			newState.cachedItems[id] = payload;
			return newState;
		case "SET_CACHED_SEARCH":
			const { term, results } = payload;
			newState.cachedSearches[term] = results;
			return newState;
		default:
			return newState;
	}
};