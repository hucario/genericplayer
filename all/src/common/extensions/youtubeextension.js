/* eslint-disable no-loop-func */
/* eslint-disable no-unreachable */
 /*
 * Youtube playlist extension.
 *
 */

import { Extension, Song, Station, Album, Artist } from './extension';
import { Howl, Howler } from 'howler'
import ytdl from 'ytdl-core'
import ytpl from 'ytpl'
import settingsProvider from '../../settingsProvider';

window.ytdl = ytdl;

let SETT = settingsProvider;
function gS(setting) {
	console.log(setting, SETT.getSetting('youtube', setting));
	return SETT.getSetting('youtube', setting);
}
function sS(setting, value) {
	return SETT.setSetting('pandora', setting, value);
}

class YoutubeExtension extends Extension {
	allowsRatings = false
	logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/YouTube_social_white_circle_(2017).svg/1024px-YouTube_social_white_circle_(2017).svg.png"
	name = "Youtube"
	isLoggedIn = true // this extension doesn't log in but that's queried by the frontend, so /shrug
	playlist = []
	history = []
	stations = []
	trimmedplaylist = []
	currentlyPlaying = {
		station: null,
		time: 0,
		volume: 100,
		song: null,
		playing: false,
		repeatOne: false
	}

	constructor() {
		super();

		this.setStates({
			currentStation: this.currentlyPlaying.station,
			time: this.currentlyPlaying.time,
			volume: this.currentlyPlaying.volume,
			song: this.currentlyPlaying.song,
			playing: this.currentlyPlaying.playing,
			repeatOne: this.currentlyPlaying.repeatOne
		})
		setInterval(() => {
			if (this.sound && this.currentlyPlaying.playing && !this.sound.playing()) {
				this.sound.play();
			}
			if (!this.currentlyPlaying.playing  || !this.currentlyPlaying.song || !this.sound) {
				return;
			}
			if (this.sound) {
				try {
					this.currentlyPlaying.time = this.sound.seek(); // get
					this.currentlyPlaying.song.length = this.sound.duration(); // get
				} catch(err) {
					this.currentlyPlaying.time = 0;
					this.currentlyPlaying.song.length = 0;
				}
			} else {
				this.currentlyPlaying.time = 0;
				this.currentlyPlaying.song.length = 0;
			}
			if (this.currentlyPlaying.time > this.currentlyPlaying.song.length) {
				if (this.currentlyPlaying.repeatOne) {
					this.currentlyPlaying.time = 0;
					this.sound.seek(0);
					this.setStates({
						time: this.currentlyPlaying.time,
						localSeekValue: this.currentlyPlaying.time
					})
					return;
				}
				this.skip();
			} else {
				this.setStates({
					time: this.currentlyPlaying.time,
					localSeekValue: this.currentlyPlaying.time
				});
			}
		}, 1000)

	}
	async login() {
		return true;
	}
	getStations() {
		return new Promise((resolve, reject) => {
			this.stations = [];
			let yea = 0;
			let pls = [
				'https://www.youtube.com/playlist?list=PL2q9e5qYXSm_1EbhWL07OQwpsVDjbLRJp',
				'https://youtube.com/playlist?list=FLu35IW_37tLDBCCWcVbh9tw',
				'https://www.youtube.com/playlist?list=PLEJlH4AF_A2YdXGfkTMr8RctfOOfxNYTX'
			]
			for (let currentPlaylist of pls) {
				ytpl(currentPlaylist, {
					pages: 1
				}).then(playlistInfo => {
					this.stations.push(new YoutubePlaylist({
						name: playlistInfo.title,
						latestCover: playlistInfo.bestThumbnail.url,
						url: currentPlaylist,
						ogData: playlistInfo,
						items: playlistInfo.items
					}, this))
					yea++;
					if (yea >= pls.length) {
						resolve(this.stations);
					}
				})	
			}
		});
	}
	getHistory() {
		return []
	}
	setVolume(a=100) {
		this.currentlyPlaying.volume = Math.min(Math.max(Number(a), 0), 100);
		if (this.sound) {
			this.sound.volume(this.currentlyPlaying.volume / 100);
		}
	}
	async playStation(stat) {
		console.log('started playStation()');
		let playlist;
		if (this.trimmedplaylist && this.currentlyPlaying.station === stat && this.trimmedplaylist.length > 0) {
			playlist = this.trimmedplaylist.slice(0, 5);
			this.trimmedplaylist = this.trimmedplaylist.slice(5);
		} else {
			this.currentlyPlaying.station = stat;
			
			playlist = await ytpl(stat.url, {
				pages: 1
			});
			playlist = playlist.items
		}
		let p = playlist;
		this.playlist = [];
		if (p.length > 5) {
			this.trimmedplaylist = p.slice(5);
			p = p.slice(0, 5)
		}
		await new Promise(async (res, rej) => {
			let asdf = 0;
			for (let b of p) {
				ytdl.getInfo(b.url).then(e => {
					let audioFormat = ytdl.filterFormats(e.formats, 'audioonly').sort((a, b) => {
						if (a.audioBitrate > b.audioBitrate) {
							return -1;
						} else if (a.audioBitrate < b.audioBitrate) {
							return 1;
						} else {
							return 0;
						}
					})[0];
	
					let t = e.videoDetails;
					this.playlist.push(new YoutubeVideo({
						name: t.title.replace(/((\[|\().*((Official)|(Directed)).*(\)|\]))/g, '').trim(),
						parentStation: stat,
						url: t.video_url,
						rating: 'unrated',
						album: new Album({
							name: (t.author.name.includes(' - Topic')?t.keywords[1]:''),
							coverUrl: t.thumbnails[t.thumbnails.length-1].url,
							url: t.video_url
						}),
						artist: new Artist({
							name: t.author.name,
							url: t.author.channel_url
						}),
						audioLink: audioFormat.url
					}))
					if (asdf++ >= p.length-1) {
						res();
					}
				})
			}
		})
		
		
		if (this.currentlyPlaying.song) {
			this.history.unshift(this.currentlyPlaying.song);
		}
		this.currentlyPlaying.station = stat
		this.currentlyPlaying.song = this.playlist.shift();
		this.currentlyPlaying.time = 0;
		this.play();
		this.setStates({
			currentStation: this.currentlyPlaying.station,
			currentSong: this.currentlyPlaying.song,
			time: this.currentlyPlaying.time,
			rating: this.currentlyPlaying.song.rating,
			repeatOne: this.currentlyPlaying.repeatOne,
			loadingSkip: false
		})

		console.log('finished playStation()');
	}
	
	setRepeat = (bool) => {
		this.currentlyPlaying.repeatOne = bool;
		if (this.sound) {
			this.sound.loop(bool);
		}
		this.setStates({
			repeatOne: this.currentlyPlaying.repeatOne
		})
	}
	seek = (a) => {
		if (!this.currentlyPlaying.song) {
			return;
		}
		this.currentlyPlaying.time = Math.min(a, this.currentlyPlaying.song.length)
		if (this.currentlyPlaying.time === this.currentlyPlaying.song.length) {
			if (this.currentlyPlaying.repeatOne) {
				this.currentlyPlaying.time = 0;
			} else {
				this.skip();
			}
		} else {
			if (this.sound) {
				this.sound.seek(this.currentlyPlaying.time);
			}
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
			} catch(e) {}
		}
	}
	addSetHistoryCb = async (cb) => {
		this.setHistoriesList.push(cb)
		cb(this.history);
	}
	updateHistories = (songArg) => {
		for (let i = 0; i < this.setHistoriesList.length; i++) {
			this.setHistoriesList[i](songArg)
		}
	}
	togglePlay = () => {
		this[this.currentlyPlaying.playing ? 'pause' : 'play']();
	}
	play = () => {
		console.log('yea 1');
		if (!this.currentlyPlaying.song) {
			if (this.playlist.length === 0) {
				return;
			} else {
				this.currentlyPlaying.song = this.playlist.shift();
			}
		}
		this.currentlyPlaying.playing = true
		if (this.sound) {
			if (!this.sound.playing()) {
				this.sound.play();
			}
		} else if (this.currentlyPlaying.song?.audioLink) {
			this.sound = new Howl({
				src: this.currentlyPlaying.song.audioLink,
				autoplay: true,
				html5: true,
				volume: (Math.min(Math.max(this.currentlyPlaying.volume, 0), 100) * 0.01),
				onend: this.skip
			});
			if (!this.sound.playing()) {
				this.sound.play();
			}
			this.setStates({
				playing: this.currentlyPlaying.playing
			})	
			return;
		}
		if (this.sound?._src !== this.currentlyPlaying.song?.audioLink) {
			if (this.sound) {
				this.sound.stop();
			}
			this.sound = new Howl({
				src: this.currentlyPlaying.song.audioLink,
				autoplay: true,
				html5: true,
				volume: (Math.min(Math.max(this.currentlyPlaying.volume, 0), 100) * 0.01),
				onend: this.skip
			});
		}

		this.setStates({
			playing: this.currentlyPlaying.playing
		})	
		console.log('finished play()');
	}
	pause = () => {
		this.currentlyPlaying.playing = false;

		if (this.sound) {
			this.sound.pause();
		}

		this.setStates({
			playing: this.currentlyPlaying.playing
		})
	}
	skip = () => {
		if (!this.currentlyPlaying.song) {
			return;
		}
		if (this.playlist.length > 0) {
			this.history.unshift(this.currentlyPlaying.song);
			this.currentlyPlaying.song = this.playlist.shift();
			this.setStates({
				loadingSkip: false
			})
		} else {
			if (this.currentlyPlaying.station) {
				this.playStation(this.currentlyPlaying.station);
			}
			if (this.playlist.length > 0) {
				this.history.unshift(this.currentlyPlaying.song);
				this.currentlyPlaying.song = this.playlist.shift();
			}
		}
		this.currentlyPlaying.time = 0;
		this.setStates({
			time: 0
		})

		if (this.currentlyPlaying.song?.audioLink) {
			if (this.sound) {
				Howler.stop();
			}
			this.sound = new Howl({
				src: this.currentlyPlaying.song.audioLink,
				autoplay: true,
				html5: true,
				volume: (Math.min(Math.max(this.currentlyPlaying.volume, 0), 100) * 0.01)
			});
		}

		this.setStates({
			currentSong: this.currentlyPlaying.song,
			rating: this.currentlyPlaying.song.rating,
			time: this.currentlyPlaying.time
		})
		this.updateHistories(this.history)
	}
	backSong = () => {
		if (!this.currentlyPlaying.song) {
			return;
		}
		if (this.currentlyPlaying.time < 5) {
			this.currentlyPlaying.time = 5;
			this.sound?.seek(0);
		}
		if (this.history.length > 0) {
			this.playlist.unshift(this.currentlyPlaying.song);
			this.currentlyPlaying.song = this.history.shift();
		} else {
			return;
		}
		this.currentlyPlaying.time = 0;
		this.setStates({
			time: 0
		})

		if (this.currentlyPlaying.song?.audioLink) {
			if (this.sound) {
				Howler.stop();
			}
			this.sound = new Howl({
				src: this.currentlyPlaying.song.audioLink,
				autoplay: true,
				html5: true,
				volume: (Math.min(Math.max(this.currentlyPlaying.volume, 0), 100) * 0.01)
			});
		}

		this.setStates({
			currentSong: this.currentlyPlaying.song,
			rating: this.currentlyPlaying.song.rating,
			time: this.currentlyPlaying.time
		})
		this.updateHistories(this.history)
	}
}

class YoutubeVideo  extends Song {
	constructor(a, parent) {
		super(a);
		this.parent = parent;
	}
	like = async () => {
		return 'unrated'
	}
	dislike = async () => {
		return 'unrated';
	}
	download = () => {
		return;
		if (!this.audioLink) {
			return;
		}
		this.parent.setStates({
			downloading: true
		})
		fetch(this.audioLink)
		.then(res => res.blob())
		.then(blob => {
			let z = this.audioLink.split('.');
			z = z[z.length-1];
			z = z.split('?');
			z = z[0];
			let link = document.createElement("a");
			
			link.download = this.name + '.' + z;
			link.href = URL.createObjectURL(blob);;
			link.click();
			this.parent.setStates({
				downloading: false
			})
		})
	}
	getRating() {
		return 'unrated';
	}
}

class YoutubePlaylist extends Station {
	constructor(a, parent) {
		super(a);
		this.parent = parent;
	}
	play = () => {
		this.parent.playStation(this);
	}
}

export {
	YoutubeExtension,
	YoutubeVideo,
	YoutubePlaylist
}

export default YoutubeExtension;
