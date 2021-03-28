import { Song, Album, Artist, Extension } from "../../ext/Extension";

const dInfo = {
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
	cachedReqs: {}
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
			return newState;
		case "SET_CURRENTLY_PLAYING_ALBUM":
//			action.payload.getPlaylist().then()
			return newState;
		case "SET_FAIL_SEARCH":
			newState.failSearch = payload;
			return newState;
		case "SET_CACHED_REQ":
			const { url, options, result } = payload;

			newState.cachedReqs[url] =newState.cachedReqs[url] ?? {};
			newState.cachedReqs[url][JSON.stringify(options)] = result;
			// woot cached reqs now
			return newState;
		default:
			return newState;
	}
};