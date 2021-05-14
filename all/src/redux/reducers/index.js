import { Song, Album, Artist, Extension } from "../../ext/Extension";

const dInfo = {
	playState: {
		time: 0,
		volume: 100,
		playing: false,
		repeatMode: false,
		url: '',
		audioBit: null,
		loading: false
	},
	song: new Song({
		title: "",
	}),
	album: new Album({
		extension: new Extension({
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
			complete: true,
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
		case "NOT_LOADING":
			newState.playState.loading = false;
			return newState;
		// see ../saga/index.ts: case "SET_CURRENTLY_PLAYING": 
		case "ATTEMPTING_PLAYING_SONG":
			if (!payload.album.extension || !payload.artist.extension || !payload.extension) {
				console.error(payload);
				throw new Error("No extension registered for song: "+payload.title);
			}
			if (newState.playState.audio) {
				newState.playState.audio.pause();
				delete newState.playState.audio;
			}
			newState.playState.loading = true;
			newState.currentlyPlayingInfo = {
				song: payload,
				album: payload.album,
				artist: payload.artist
			}
			return newState;
		case "PLAY_SONG_SUCCEEDED":
			Object.assign(newState, action.payload)
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