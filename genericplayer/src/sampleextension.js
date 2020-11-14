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



class SampleExtension extends Extension {
	allowsRatings = true
	logo = "https://1.gravatar.com/avatar/ab748872b9461554f80c9f1326727984?s=128"
	name = "Pandora"
	isLoggedIn = false
	ok = true

	constructor(...a) {
		super();
	}
	async login() {
		return true;
	}
	async getStations() {
		let res = []
		return res;
	}
	getHistory() {
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
		];
	}
}

class SampleSong extends Song {
	rating = "unrated"
	name = ""
	url = ""
	artist = new Artist();
	album = new Album();

	constructor(opt) {
		super();
		for (let key in opt) {
			this[key] = opt[key];
		}
		this.like = this.like.bind(this);
		this.dislike = this.dislike.bind(this);
		this.download = this.download.bind(this);

	}
	like() {
		if (this.rating === 'liked') {
			this.rating = 'unrated';
		} else {
			this.rating = 'liked'
		}

		return this.rating;
	}
	dislike() {
		if (this.rating === 'disliked') {
			this.rating = 'unrated';
		} else {
			this.rating = 'disliked'
		}

		return this.rating;
	}
	download() {
		alert(`Downloading ${this.name}${(this.url !== ""?' from '+this.url:'')}`)
	}
}

class SampleStation extends Station {
	latestCover = undefined;

	// eslint-disable-next-line no-useless-constructor
	constructor() {
		super();
	}
	getPlaylist() {

	}
	play() {

	}
}

export {
	SampleExtension,
	SampleSong,
	SampleStation
}