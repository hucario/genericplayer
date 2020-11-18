import {
	Extension,
	Song,
	Station,
	Album,
	Artist
} from './extension'

/*
 * Sample extension.
 *
 */




class SampleSong extends Song {
	rating = "unrated"
	name = ""
	url = ""
	artist = new Artist();
	album = new Album();
	length = Math.floor(Math.random()*250) // aaaaa

	constructor(opt) {
		super();
		for (let key in opt) {
			this[key] = opt[key];
		}
	}
	like = async () => {
		if (this.rating === 'liked') {
			this.rating = 'unrated';
		} else {
			this.rating = 'liked'
		}

		return this.rating;
	}
	dislike = async () => {
		if (this.rating === 'disliked') {
			this.rating = 'unrated';
		} else {
			this.rating = 'disliked'
		}

		return this.rating;
	}
	getRating = () => {
		return this.rating;
	}
	download = () => {
		alert(`Downloading ${this.name}${(this.url !== ""?' from '+this.url:'')}`)
	}
}

class SampleStation extends Station {
	getPlaylist() {
		return [
			new SampleSong({
				name: "No Cover Bois",
				album: new Album({
					name: "No Cover Bois (Single)"
				}),
				artist: new Artist({
					name: "a No Cover boi"
				}),
				rating: "unrated"
			}),
			new SampleSong({
				name: 'Under Pressure',
				album: new Album({
					name: 'Best of Bowie',
					coverUrl: './sample/best_of_bowie.jpg'
				}),
				artist: new Artist({
					name: 'David Bowie'
				}),
				rating: 'liked'
			}),
			new SampleSong({
				name: 'Linus & Lucy',
				album: new Album({
					name: 'A Charlie Brown Christmas',
					coverUrl: './sample/charlie_brown.jpg'
				}),
				artist: new Artist({
					name: 'Vince Geraldi Trio'
				}),
				rating: 'liked'
			}),
			new SampleSong({
				name: 'September',
				album: new Album({
					name: 'Greatest Hits',
					coverUrl: './sample/greatest_hits.jpg'
				}),
				artist: new Artist({
					name: 'Earth, Wind & Fire'
				}),
				rating: 'unrated'
			}),
			new SampleSong({
				name: 'Johnny B. Goode',
				album: new Album({
					name: 'Johnny B. Goode Sessions',
					coverUrl: './sample/johnny_b_goode.jpg'
				}),
				artist: new Artist({
					name: 'Chuck Berry'
				}),
				rating: 'disliked'
			}),
			new SampleSong({
				name: 'Paradise',
				album: new Album({
					name: 'Paradise (Single)',
					coverUrl: './sample/paradise.jpg'
				}),
				artist: new Artist({
					name: 'Coldplay'
				}),
				rating: 'liked'
			}),
			new SampleSong({
				name: 'What I Like About You',
				album: new Album({
					name: 'What I Like About You (And Other Romantic Hits)',
					coverUrl: './sample/romantics.jpg'
				}),
				artist: new Artist({
					name: 'The Romantics'
				}),
				rating: 'unrated'
			}),
			new SampleSong({
				name: 'All Star',
				album: new Album({
					name: 'All Star Smash Hits',
					coverUrl: './sample/smash_hits.jpg'
				}),
				artist: new Artist({
					name: 'Smash Mouth'
				}),
				rating: 'liked'
			}),
			new SampleSong({
				name: 'Step Out',
				album: new Album({
					name: 'Step Out (From the Secret Life of Walter Mitty)',
					coverUrl: './sample/step_out.jpg'
				}),
				artist: new Artist({
					name: 'Jose Gonzales'
				}),
				rating: 'unrated'
			}),
			new SampleSong({
				name: 'You Are The Sunshine of My Life',
				album: new Album({
					name: 'Number Ones',
					coverUrl: './sample/stevie_wonder.jpg'
				}),
				artist: new Artist({
					name: 'Stevie Wonder'
				}),
				rating: 'liked'
			}),
			new SampleSong({
				name: 'Stars',
				album: new Album({
					name: 'say i am you',
					coverUrl: './sample/the_weepies.jpg'
				}),
				artist: new Artist({
					name: 'The Weepies'
				}),
				rating: 'unrated'
			}),
			new SampleSong({
				name: 'RE: Your Brains',
				album: new Album({
					name: 'Thing A Week Two',
					coverUrl: './sample/thing_a_week_two.jpg'
				}),
				artist: new Artist({
					name: 'Jonathan Coulton'
				}),
				rating: 'disliked',
				url: 'https://gaming.com'
			}),
			new SampleSong({
				name: 'Something or idk im tired',
				album: new Album({
					name: 'Hello San Fransisco',
					coverUrl: './sample/train.jpg'
				}),
				artist: new Artist({
					name: 'Train'
				}),
				rating: 'disliked'
			}),
			new SampleSong({
				name: 'Viva La Vida',
				album: new Album({
					name: 'Viva La Vida',
					coverUrl: './sample/viva_la_vida.jpg'
				}),
				artist: new Artist({
					name: 'Coldplay'
				}),
				rating: 'unrated'
			})
		].sort(() => {
			return Math.round(Math.random() - Math.random())
		})
	}
}

class SampleExtension extends Extension {
	/** @type { Boolean } */
	allowsRatings = true
	/** @type { String } */
	logo = "https://1.gravatar.com/avatar/ab748872b9461554f80c9f1326727984?s=128"
	/** @type { String } */
	name = "Pandora"
	/** @type { Boolean } */
	loggedIn = true
	currentlyPlaying = {
		station: null,
		time: 0,
		volume: 100,
		song: null,
		playing: false,
		repeatOne: false
	}
	/** @type { SampleSong[] } */
	playlist = []
	/** @type { SampleSong[] } */
	history = []
	/** @type { SampleStation[] } */
	stations = []
	/** @type { Function[] } */
	setStatesList = []
	/** @type { Function[] } */
	setHistoriesList = []

	constructor() {
		super();
		this.getStations().then((e) => {
			this.stations = e;
		})
		this.setStates({
			currentStation: this.currentlyPlaying.station,
			time: this.currentlyPlaying.time,
			volume: this.currentlyPlaying.volume,
			song: this.currentlyPlaying.song,
			playing: this.currentlyPlaying.playing,
			repeatOne: this.currentlyPlaying.repeatOne
		})

		setInterval(() => {
			if (!this.currentlyPlaying.playing) {
				return;
			}
			this.currentlyPlaying.time++;
			if (this.currentlyPlaying.time > this.currentlyPlaying.song.length) {
				if (this.currentlyPlaying.repeatOne) {
					this.currentlyPlaying.time = 0;
					this.setStates({
						time: this.currentlyPlaying.time
					})
					return;
				}
				this.skip();
			} else {
				this.setStates({
					time: this.currentlyPlaying.time
				});
			}
		}, 1000)
	}

	setRepeat = (bool) => {
		this.currentlyPlaying.repeatOne = bool;
		this.setStates({
			repeatOne: this.currentlyPlaying.repeatOne
		})
	}

	playStation = async (stat) => {
		if (this.currentlyPlaying.song) {
			this.history.unshift(this.currentlyPlaying.song);
		}
		this.currentlyPlaying.station = stat
		this.playlist = this.currentlyPlaying.station.getPlaylist()
		this.currentlyPlaying.song = this.playlist.shift();
		this.currentlyPlaying.time = 0;
		this.setStates({
			currentStation: this.currentlyPlaying.station,
			currentSong: this.currentlyPlaying.song,
			time: this.currentlyPlaying.time,
			rating: this.currentlyPlaying.song.rating,
			repeatOne: this.currentlyPlaying.repeatOne
		})
	}

	seek = (a) => {
		this.currentlyPlaying.time = Math.min(a, this.currentlyPlaying.song.length)
		if (this.currentlyPlaying.time === this.currentlyPlaying.song.length) {
			this.skip();
		} else {
			this.setStates({
				time: this.currentlyPlaying.time
			})
		}
	}
	addSetStateCb = (cb) => {
		this.setStatesList.push(cb);
		cb({
			currentStation: this.currentlyPlaying.station,
			time: this.currentlyPlaying.time,
			volume: this.currentlyPlaying.volume,
			song: this.currentlyPlaying.song,
			playing: this.currentlyPlaying.playing,
			rating: (this.currentlyPlaying.song && this.currentlyPlaying.song.rating) || 'unrated',
			repeatOne: this.currentlyPlaying.repeatOne
		})
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
	togglePlay = () => {
		this.currentlyPlaying.playing = !this.currentlyPlaying.playing;
		this.setStates({
			playing: this.currentlyPlaying.playing
		})
	}
	play = () => {
		this.currentlyPlaying.playing = true
		this.setStates({
			playing: this.currentlyPlaying.playing
		})	
	}
	pause = () => {
		this.currentlyPlaying.playing = false;
		this.setStates({
			playing: this.currentlyPlaying.playing
		})
	}
	skip = () => {
		if (this.playlist.length > 0) {
			this.history.unshift(this.currentlyPlaying.song);
			this.currentlyPlaying.song = this.playlist.shift();
		} else {
			this.playlist = this.currentlyPlaying.station.getPlaylist();
			this.history.unshift(this.currentlyPlaying.song);
			this.currentlyPlaying.song = this.playlist.shift();
		}
		this.currentlyPlaying.time = 0;
		this.setStates({
			currentSong: this.currentlyPlaying.song,
			rating: this.currentlyPlaying.song.rating,
			time: this.currentlyPlaying.time
		})
		this.updateHistories(this.history)
	}
	backSong = () => {
		this.currentlyPlaying.time = 0;
		this.setStates({
			time: this.currentlyPlaying.time
		})
	}

	login = async (a,b) => {
		this.loggedIn = true;		
		this.setStates({
			loggedIn: this.loggedIn
		})
		return true;
	}
	prepareRandom = async () => {
		let x = await this.getStations();
		this.currentlyPlaying.station = x[Math.floor(Math.random()*x.length)]
		this.playlist = this.currentlyPlaying.station.getPlaylist()
		for (let i = 0, p = Math.random()*5; i < p; i++) {
			this.playlist.shift()
		}
		this.currentlyPlaying.song = this.playlist.shift();
		this.currentlyPlaying.time = Math.floor(Math.random()*this.currentlyPlaying.song.length)
		this.currentlyPlaying.playing = true;
		this.setStates({
			currentStation: this.currentlyPlaying.station,
			currentSong: this.currentlyPlaying.song,
			time: this.currentlyPlaying.time,
			rating: this.currentlyPlaying.song.rating,
			loggedIn: true,
			playing: true
		})
	}
	getStations = async () => {
		let res= [
			new SampleStation({
				"latestCover": "https://www.pandora.com/img/shuffle_art_500W_500H.png",
				"name": "QuickMix",
				"token": "1430491420860921164",
				"url": "https://www.pandora.com/login?target=%2Fstations%2F157b0f36ae965be49ee6cbc5f601d067621724486b479c9f"
			}),
			new SampleStation({
				"latestCover": "https://content-images.p-cdn.com/images/ba/24/46/81/503d427b8b32c169ba0a9775/_500W_500H.jpg",
				"name": "Snail's House Radio",
				"token": "4539669987906336076",
				"url": "https://www.pandora.com/login?target=%2Fstations%2F0e1078b3a7f9116636251cacc1a683f514f7c8ba48d51cea"
			}),
			new SampleStation({
				"latestCover": "https://content-images.p-cdn.com/images/52/a6/b0/18/4d5a48cbaa0a9af537f5fcf8/_500W_500H.jpg",
				"name": "Ibrahim Radio",
				"token": "4528817898334500172",
				"url": "https://www.pandora.com/login?target=%2Fstations%2F4acf9bc1cac6d3f7b1808a219985e70c0d90c3d5c71d9d6c"
			}),
			new SampleStation({
				"latestCover": "https://content-images.p-cdn.com/images/4b/f9/c1/6f/98fb424d97879b6ce87846b6/_500W_500H.jpg",
				"name": "half•alive Radio",
				"token": "4498883337786013004",
				"url": "https://www.pandora.com/login?target=%2Fstations%2Fca5437498749e1de3409b263eab3e8285eab12aaa506f8f7"
			}),
			new SampleStation({
				"name": "Brand New Day Radio",
				"token": "4177796083862779212",
				"latestCover": "http://cont-3.p-cdn.us/images/public/int/1/2/6/8/074646938621_500W_500H.jpg",
				"url": "https://www.pandora.com/login?target=%2Fstations%2F7389472cd15e9da9bcb5cd0bbe29fe8c7a3b12622a0f1f48"
			}),
			new SampleStation({
				"latestCover": "https://content-images.p-cdn.com/images/1e/5f/f6/c2/46bd46e78f5797171e40b3dc/_500W_500H.jpg",
				"name": "Joey Pecoraro Radio",
				"token": "4040024562483115340",
				"url": "https://www.pandora.com/login?target=%2Fstations%2F677c83e609d7d38331f4ba1ad1ce34ad9e30e55885cd02b6"
			}),
			new SampleStation({
				"latestCover": "https://content-images.p-cdn.com/images/a5/07/5e/c1/5aac49369a1fb023310c8ac1/_500W_500H.jpg",
				"name": "Proleter Radio",
				"token": "3917362078920783180",
				"url": "https://www.pandora.com/login?target=%2Fstations%2Fd80955c23964e63087c622bcb794e6cf902fd0c70dcd0bb5"
			}),
			new SampleStation({
				"latestCover": "https://content-images.p-cdn.com/images/20/a5/4d/c4/ffe145edb94dc4ef6156653c/_500W_500H.jpg",
				"name": "Run On Radio",
				"token": "3702237251647354188",
				"url": "https://www.pandora.com/login?target=%2Fstations%2Fa5fe5f8d224bf3c19ca066519f831de3a5a8200ed6a00c22"
			}),
			new SampleStation({
				"latestCover": "https://content-images.p-cdn.com/images/95/fe/76/8a/24ab4bd6a5eb896f2a64a846/_500W_500H.jpg",
				"name": "Tom Petty Radio",
				"token": "3597340213110158668",
				"url": "https://www.pandora.com/login?target=%2Fstations%2F3401f647372242322cb7f6a320670459b534fb1ddfb6e605"
			}),
			new SampleStation({
				"latestCover": "https://content-images.p-cdn.com/images/09/69/77/8e/409a4b7e98119b074562e003/_500W_500H.jpg",
				"name": "Fox Stevenson Radio",
				"token": "3459338953929831756",
				"url": "https://www.pandora.com/login?target=%2Fstations%2F59b65dddcc0d8861e1141b1de4a840f35253a6d1a737b7c4"
			}),
			new SampleStation({
				"latestCover": "https://mediaserver-cont-usc-mp1-1-v4v6.pandora.com/images/public/int/5/7/2/2/859725572275_500W_500H.jpg",
				"name": "M U S I C",
				"token": "3306505901366097228",
				"url": "https://www.pandora.com/login?target=%2Fstations%2F4caa3e39eec7377fbcd7c1ebe5778a6485e52c0acb6062d2"
			}),
			new SampleStation({
				"latestCover": "https://mediaserver-cont-usc-mp1-1-v4v6.pandora.com/images/public/int/5/7/2/2/859725572275_500W_500H.jpg",
				"name": "Tristam Radio",
				"token": "3306505540588844364",
				"url": "https://www.pandora.com/login?target=%2Fstations%2F7db5f45e93dc1c916ba661a3922a1d92e216c6d72f4fdaa4"
			}),
			new SampleStation({
				"latestCover": "https://content-images.p-cdn.com/images/af/17/9b/79/f6404d7982bde3d43a261ec0/_500W_500H.jpg",
				"name": "Chillstep Radio",
				"token": "3306503680868005196",
				"url": "https://www.pandora.com/login?target=%2Fstations%2F73f94deafc373c615cbb481d697bca9534ae90ad56bef809"
			}),
			new SampleStation({
				"latestCover": "https://content-images.p-cdn.com/images/39/7b/e7/23/5c0041fd9ce958d917208c7f/_500W_500H.jpg",
				"name": "Video Game Music Radio",
				"token": "3306499892706850124",
				"url": "https://www.pandora.com/login?target=%2Fstations%2F864466d4f5e2ed94e1cddfca575c8b65d0cde5bd949c30d0"
			}),
			new SampleStation({
				"latestCover": "https://content-images.p-cdn.com/images/59/fc/bd/b2/5f754a1cb5cf49d59a5a8914/_500W_500H.jpg",
				"name": "Glitch Hop Radio",
				"token": "3306497234122093900",
				"url": "https://www.pandora.com/login?target=%2Fstations%2F9a066c1cd8e559aec529333f921cbf885f469a018bb7de7f"
			}),
			new SampleStation({
				"latestCover": "https://content-images.p-cdn.com/images/f7/09/45/7f/12a6498295ba54ae75c6d43b/_500W_500H.jpg",
				"name": "Owl City Radio",
				"token": "1430491369321313612",
				"url": "https://www.pandora.com/login?target=%2Fstations%2F7ee59f2b49f7c81e9233b0346d2bfaa6c91b85dafc80a122"
			})
		];
		return res;
	}
	getHistory = async () => {
		// doesn't have to be async but to keep consistency between extensions
		return this.history;
	}
}


export {
	SampleExtension,
	SampleSong,
	SampleStation
}