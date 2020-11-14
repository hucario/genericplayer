/*
 * Default extension class definitions.
 *
 */


class Artist {
	name = "ARTIST NAME"
	url = "ARTIST URL"
	picUrl = "ARTIST PICTURE URL"

	constructor(opts) {
		for (let key in opts) {
			this[key] = opts[key];
		}
	}
}

class Album {
	name = "ALBUM NAME"
	url = "ALBUM URL"
	coverUrl = "ALBUM PICTURE URL"
	constructor(opts) {
		for (let key in opts) {
			this[key] = opts[key];
		}
	}
}

class Extension {
	allowsRatings = false
	logo = undefined
	isLoggedIn = false
	name = undefined

	constructor() {
		"gaming"
	}
	login(username, pw) {

	}
	getStations() {

	}
	getHistory() {

	}
}

class Song {
	rating = "unrated"
	title = ""
	artist = new Artist()
	album = new Album()


	constructor() {
		"eslint stop warning me about useless constructors"
	}
	like() {

	}
	dislike() {

	}
	download() {

	}
}

class Station {
	latestCover = undefined;

	constructor() {
		"hmm yes this is a constructor"
	}
	play() {

	}
}


export { 
	Extension,
	Song,
	Station,
	Artist,
	Album
}