import { Song, Album, Artist, Extension } from "../../ext/Extension";

const dInfo = {
	song: new Song({
		title: "Pluie",
	}),
	album: new Album({
		sauce: new Extension({
			colors: {
				normal: '#ffffff12',
				hover: '#ffffff30'
			},
			icon: ''
		}),
		title: "L'été",
		url: 'https://soundcloud.com/ujico/pluie',
		icon: 'https://i1.sndcdn.com/artworks-000368504031-sxt6dn-t500x500.jpg'
	}),
	artist: new Artist({
		name: "Snail's House",
	}),
	failSearch: '' // used to search for latest album if it can't be found
}
dInfo.album.artist = dInfo.artist;

const initialState = {
	currentlyPlayingInfo: dInfo
};

export default function rootReducer(state = initialState, action) {
	let newState = {};
	Object.assign(newState, state);

	switch (action.type) {
		case "SET_CURRENTLY_PLAYING": 
			newState.currentlyPlayingInfo = {
				song: action.payload,
				album: action.payload.album,
				artist: action.payload.artist
			}
			return newState;
		case "SET_CURRENTLY_PLAYING_ALBUM":
//			action.payload.getPlaylist().then()
			return newState;
		case "SET_FAIL_SEARCH":
			newState.failSearch = action.payload;
			return newState;
			
		default:
			return newState;
	}
};