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
	}
	login(username, pw) {

	}
	getStations() {

	}
	getHistory() {

	}
	addSetStateCb = (cb) => {
		this.setStatesList.push(cb);
	}
	setStates = (obj) => {
		for (let i = 0; i < this.setStatesList.length; i++) {
			try {
				this.setStatesList[i](obj)
			} catch(e) {

			}
		}
	}
	addSetHistoryCb = async (cb) => {
		this.setHistoriesList.push(cb)
		let x = await this.getHistory();
		cb(x);
	}
	updateHistories = (songArg) => {
		for (let i = 0; i < this.setHistoriesList.length; i++) {
			this.setHistoriesList[i](songArg)
		}
	}

	
	/** @type { Function[] } */
	setStatesList = []
	/** @type { Function[] } */
	setHistoriesList = []

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
