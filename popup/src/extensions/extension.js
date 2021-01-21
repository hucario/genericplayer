/*
 * Default extension class definitions.
 *
 */


class Artist {
	name = ""
	url = ""
	picUrl = ""

	constructor(opts) {
		for (let key in opts) {
			this[key] = opts[key];
		}
	}
}

class Album {
	name = ""
	url = ""
	coverUrl = ""
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


	constructor(opts) {
		for (let key in opts) {
			this[key] = opts[key];
		}
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
	name = "";

	constructor(opts) {
		for (let key in opts) {
			this[key] = opts[key];
		}
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