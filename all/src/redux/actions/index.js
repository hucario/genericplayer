export function addArticle(payload) {
	return {
		type: "ADD_ARTICLE",
		payload
	}
};

export function setCurrentlyPlaying(payload) {
	return {
		type: "SET_CURRENTLY_PLAYING",
		payload
	}
}
export function setCurrentlyPlayingAlbum(payload) {
	return {
		type: "SET_CURRENTLY_PLAYING_ALBUM",
		payload
	}
}
export function setFailSearch(payload) {
	return { 
		type: "SET_FAIL_SEARCH",
		payload
	}
}