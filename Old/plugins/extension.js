/*
 * "sample" extension.
 *
 */

class Extension {
	allowsRatings = false
	logo = undefined
	isLoggedIn = false
	name = undefined

	constructor() {
		
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
	albumCover = undefined
	title = ""
	albumTitle = ""
	artist = ""
	songUrl = ""


	constructor() {

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

	}
	play() {

	}
}