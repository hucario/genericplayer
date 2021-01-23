 /*
 * Pandora extension.
 *
 */

import { Extension, Song, Station, Album, Artist } from './extension';
import { encrypt, decrypt } from './pandora/crypt';
import { Howl, Howler } from 'howler'

import settingsProvider from '../../settingsProvider';


let SETT = settingsProvider;
function gS(setting) {
	console.log(setting, SETT.getSetting('pandora', setting));
	return SETT.getSetting('pandora', setting);
}
function sS(setting, value) {
	return SETT.setSetting('pandora', setting, value);
}
class PandoraExtension extends Extension {
	allowsRatings = true
	logo = "https://1.gravatar.com/avatar/ab748872b9461554f80c9f1326727984?s=128"
	name = "Pandora"
	isLoggedIn = false
	ok = true
	partnerID = ""
	syncTime = undefined
	userID = ""
	partnerAuthToken = ""
	userAuthToken = ""
	playlist = []
	history = []
	stations = []
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
		if (gS('username') && gS('password')) {
			this.login(gS('username'), gS('password'));
		} else if (gS('uaToken') && gS('uID') && gS('paToken') && gS('syncTime') && gS('syncStart')) {
			this.isLoggedIn = true;
			this.userAuthToken = gS('uaToken');
			this.userID = gS('uID');
			this.partnerAuthToken = gS('paToken');
			this.syncTime = gS('syncTime');
			this.syncStart = gS('syncStart');
		}

		
		this.getStations();

		this.setStates({
			currentStation: this.currentlyPlaying.station,
			time: this.currentlyPlaying.time,
			volume: this.currentlyPlaying.volume,
			song: this.currentlyPlaying.song,
			playing: this.currentlyPlaying.playing,
			repeatOne: this.currentlyPlaying.repeatOne
		})
		setInterval(() => {
			if (!this.currentlyPlaying.playing  || !this.currentlyPlaying.song || !this.sound) {
				return;
			}
			this.currentlyPlaying.time = this.sound.seek(); // get
			this.currentlyPlaying.song.length = this.sound.duration(); // get
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
	async login(username, pw) {
		if (!this.partnerAuthToken || !this.partnerID) {
			await this.partnerLogin();
		}
		let res = await this.sendReq('auth.userLogin', {
			loginType: "user",
			username: username,
			password: pw,
			partnerAuthToken: this.partnerAuthToken
		}, true)
		if (res.stat === "fail") {
			if (res.code === 1002) {
				if (gS('username') === username && gS('password') === pw) {
					sS('password', '');
				}
				throw new Error("Incorrect username or password.");
			}
			throw new Error("An unexpected error occurred.");
		}
		this.userAuthToken = res.result.userAuthToken;
		this.userID = res.result.userId;
		sS('uaToken', this.userAuthToken)
		sS('uID', this.userID)
		sS('username', username)
		sS('password', pw)
		this.setStates({
			loggedIn: true
		})
		this.getStations().then((r) => {
			this.setStates({
				stations: r
			})
		});
		return res.stat!=='fail';
	}
	async getStations() {
		if (!this.userAuthToken) {
			return new Error("User is not logged in.");
		}
		let res = await this.sendReq('user.getStationList', {
			includeExplanations: true,
			includeStationArtUrl: true,
			userAuthToken: this.userAuthToken
		}, true)
		let pStat = [];
		if (!res.result.stations) {
			return [];
		}
		let stations = res.result.stations;
		for (let i = 0; i < stations.length; i++) {
			pStat.push(new PandoraStation({
				name: stations[i].stationName,
				token: stations[i].stationToken,
				latestCover: stations[i].artUrl,
				url: stations[i].stationDetailUrl,
				ogData: stations[i]
			}, this));
		}
		this.stations = pStat;
		return pStat;
	}
	getHistory() {
		return []
	}
	getSyncTime() {
		return this.syncTime + (Math.floor(Date.now() / 1000) - this.syncStart);
	}
	setVolume(a=100) {
		this.currentlyPlaying.volume = Math.min(Math.max(Number(a), 0), 100);
		if (this.sound) {
			this.sound.volume(this.currentlyPlaying.volume / 100);
		}
	}
	async partnerLogin(level=0) {

		this.syncStart = Math.floor(Date.now()/1000)
		let a = await this.sendReq('auth.partnerLogin', {
			'username': 'android',
			'password': 'AC7IBG09A3DTSYM4R41UJWL07VLN8JI7',
			'deviceModel': 'android-generic',
			'version': '5'
		});
		if (a.stat !== "ok") {
			this.ok = false;
			if (level<3) {
				this.partnerLogin(level+1);
			} else {
				throw new Error("After three retries, authentication request has failed.");
			}
			return;
		}
		let c = a.result;
		// @ts-ignore
		let d = decrypt(c.syncTime).toString().substring(4);

		this.syncTime = parseInt(d);
		this.partnerID = c.partnerId;
		this.partnerAuthToken = c.partnerAuthToken;

		sS('paToken', this.partnerAuthToken);
		sS('partnerID', this.partnerID);
		sS('syncStart', this.syncStart);
		sS('syncTime', this.syncTime);

	}
	async sendReq(method, data, encryptthis=false) {
		if (this.userAuthToken) {
			data.auth_token = data.auth_token || this.userAuthToken;
		}
		if (typeof this.syncTime !== "undefined") {
			data.syncTime = this.syncTime + (Math.floor(Date.now() / 1000) - this.syncStart);
		}
		let queryString = '' 
		if (this.userAuthToken || this.partnerAuthToken) {
			queryString += '&auth_token=';
			if (this.userAuthToken) {
				queryString += encodeURIComponent(this.userAuthToken);
				data.userAuthToken = data.userAuthToken ?? this.userAuthToken;
			} else {
				queryString += encodeURIComponent(this.partnerAuthToken);
			}
		}
		if (this.partnerID) {
			queryString += '&partner_id=' + encodeURIComponent(this.partnerID);
		}
		if (this.userID) {
			queryString += '&user_id=' + encodeURIComponent(this.userID);
		}
		console.log(data, method + queryString);
		
		if (encryptthis) {
			// @ts-ignore
			data = encrypt(JSON.stringify(data));
		} else {
			data = JSON.stringify(data);
		}
		let req = await fetch(
			'https://tuner.pandora.com/services/json/?method=' + method + queryString, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': (encryptthis?'text/plain':'application/json'),
				"accept": "application/json, text/javascript, */*; q=0.01",
				"accept-language": "en-US,en;q=0.9",
				"referrerPolicy": "strict-origin-when-cross-origin",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "none"
			},
			body: data
		})
		let b = await req.json();
		return b;
	}

	playStation(stat) {
		this.currentlyPlaying.station = stat;
		this.sendReq('station.getPlaylist', {
			stationToken: ''+stat.token,
			additionalAudioUrl: 'HTTP_128_MP3'
		}, true).then(b => {
			/*
				Example `b`:
				{
  "stat": "ok",
  "result": {
    "items": [
      {
        "songIdentity": "626b0dbdcacdc6e56e536057c7ea1d87",
        "trackToken": "PKVNjx4qVGQyiJCf9Ud5tS6k7EHA2jKsAvhuEevIInFqyteZ3o8DSno8hiuTZqMWWTNHNJAeiv2qFQdDgWMbKgsMs6fjgUTvs",
        "artistName": "Snail's House",
        "pandoraType": "TR",
        "albumName": "Ordinary Songs",
        "amazonAlbumUrl": "https://www.amazon.com/gp/search/?index=music&field-artist=Snail%27s+House&field-title=Ordinary+Songs&tag=wwwpandoracom-20",
        "modeId": 0,
        "songExplorerUrl": "http://www.pandora.com/xml/music/song/snails-house/ordinary-songs/snowlight",
        "isFeatured": false,
        "albumArtUrl": "http://mediaserver-cont-dc6-2-v4v6.pandora.com/images/public/int/5/5/3/7/859719017355_500W_500H.jpg",
        "artistDetailUrl": "http://www.pandora.com/snails-house/AR5d3XhxgdVKJ92?dc=232&ad=1:21:1:95713::0:0:1:1:862:065:CA:06061:2:0:0:0:0:1",
        "itunesSongUrl": "http://search.itunes.apple.com/WebObjects/MZSearch.woa/wa/search?term=Snail%27s+House+%5BSnowlight%5D&at=11l3Hh&app=itunes&ct=google_sdk",
        "audioUrlMap": {
          "highQuality": {
            "bitrate": "64",
            "encoding": "aacplus",
            "audioUrl": "http://mediaserver-sv5-rt-1-v4v6.pandora.com/access/8723319516694025366.mp4?version=5&lid=1118352716&token=w62R8d0FVC55PwcQbY6KOB8lPmX%2BUbRkU%2BUaLh7AF9rS77f%2FsVbfs0%2FI2HQZ5WNcPxKJ44P%2Bi3vTIb5C73MLNjoGDH2dfVTgVwEgecZFtbbRp7W%2BVNb%2FG3ioXJOUoT%2FhVUs3kj2YhD7sFvUgpmysWpHQb1tGzKD1T5i%2F7YlDnq38%2B7aZXpHG3P4j4TJGgc0QOI1PzcTqWu4em%2B5oEx0%2Bj3%2FO%2Ba%2FGntFPY9ZYrtjT3DIo1GnIHtiOpTwC2I9btqABdM4VW%2FTxuitR%2B6raZDRcPklBh081%2BmG%2BXxZCoMUpdIRPizy%2BaiobMvzG6KunKDEbzu7sCr7Np4ipro5dtX1h1%2B7TDuTrjYz%2Fd0hTY95HWDw1ByHCYAqGmZcmBxUTe6UWyXMfGEHnhz4N6yCQ7sbwYB9vmnLPDlqmg5bKXDkB4%2B8WORfUiz1mU3II2RIZtO7cahGsfF7%2F9WNv3EmkRxpYKWXvrC7b%2F2UM5H8YmlPykD4tIO9p%2FyFFfgQM7XJDm3LYuJPpGUVH%2FK7XWS0HbPu%2FCiyq%2BDrIar2xrAkNTn70W95SE423boURQvkz4fWH2Zk4",
            "protocol": "http"
          },
          "mediumQuality": {
            "bitrate": "64",
            "encoding": "aacplus",
            "audioUrl": "http://mediaserver-sv5-rt-1-v4v6.pandora.com/access/1285556604727994652.mp4?version=5&lid=1118352716&token=w62R8d0FVC55PwcQbY6KOB8lPmX%2BUbRkU%2BUaLh7AF9rS77f%2FsVbfs0%2FI2HQZ5WNcPxKJ44P%2Bi3vTIb5C73MLNjoGDH2dfVTgVwEgecZFtbbRp7W%2BVNb%2FG3ioXJOUoT%2FhVUs3kj2YhD7sFvUgpmysWpHQb1tGzKD1T5i%2F7YlDnq38%2B7aZXpHG3NIRQjxyHgnpDyM6Hnwe3edD16ZIPqChPSw3qsrgWPNwII1fLGGuq5C4rJTzJ4qgD2HwxHYCkUjob64Y5nggKpz6PJjkmU530Bp0hQTMZerpvjWWuJycCgG%2B%2B0pmpRodoVIYyd9%2F%2BJNn1qlbw96s2ABjuLPjHjMivozjaYHbaVq9J%2FWnzvUIwPnrIIdQkk6a0NMsCYMsVs%2FufnbCVe714Gmd5vHpeOqJXzbPQNBi4vap%2FZN%2B71tpyp0LE0WeVsJvkoj%2Fy24tt8smb8DsBjucWiVjSKnr5BFjih%2BAxw9%2BMt6LXKo9kkTb15Giuti41vf46R3Bycl5%2B%2FdXPY2CK6Y99o3M6m52csy2GHQSxjHw%2BeeifjK8nzgfNePBT3SK04UKZg%3D%3D",
            "protocol": "http"
          },
          "lowQuality": {
            "bitrate": "32",
            "encoding": "aacplus",
            "audioUrl": "http://mediaserver-sv5-rt-1-v4v6.pandora.com/access/3694980506305230546.mp4?version=5&lid=1118352716&token=w62R8d0FVC55PwcQbY6KOB8lPmX%2BUbRk%2B8q0ybG%2BXbwqayrcrtvyUox0LaAYWWFJ1tGcR15yozRcEgkKeAmMMQ%2BjKn35YfMZwjs2TpXUsvdfUaheIJU%2FCnHk7KOTqpUpNZiDCBQMeY7CBsW0v9ao5E%2BBaJd8toWZhUzvjGN8GvFj5KXavoeAODjU2XYc65yCp9bYFhPAGtxhl%2F87ofr4LEbSh3Y5gfgAGfDRF0krDzZo8e8%2Fx7BD01dGE7SIZNSxVSys73cKMjFpJ2Ad%2BPBVlss5xVOQ%2FOG8QgnuO7GBOFd4MDRE94TP2qLzz8OD121Qm9zBOoufyu9qFENUDl49OjCyY9mLLACi%2BBAikH5Y0uIk1CKepEkTkvaxKpLfjl3LFoKaXNslFzDTF5Jc%2F%2BARZg%2BT3bRW3rZnFyQwztBrAkuHcCHSA8QCPQgMbf8yrBAL8ICcxZuaP2szKBiXugh5V0sG9e3k2EyZaPgkpS49rxRyKyBrwTfGcPHaoKIxvJEPDuAYm36KVGIRfH2LDKPxYeY0Bm4cXTZG%2BU2cHsRwqyVHVk%2F4zakajw%3D%3D",
            "protocol": "http"
          }
        },
        "additionalAudioUrl": "http://mediaserver-sv5-rt-1-v4v6.pandora.com/access/623848740863387578.mp3?version=5&lid=1118352716&token=w62R8d0FVC55PwcQbY6KOB8lPmX%2BUbRkYTPlXTU0JwBy28h93vtVG0k19gJJZSICuRBtlfGJA8zTY%2BGwNpqT6O0jhA6I%2BYosNvR1BPcNRTNv7R3Pbf7e7dMUpu1TXzw59ZcUdfMnfQh2X%2B6MXKLGr3UXAp2HyxLYOMyYvK4BtT%2FlrnHfQVJm0Yc0fuHiLhmHbJqPqrmSluVdWL6lhVVhG%2FRlGWp7EFeiRHkPhp7MNll%2BO%2FWkJMv6%2BgRhA59ysU3DVwbbubq4VNWqygclecRIxmy7WNSytMm7SHvSJIuzUD1CJZzbmxfCIJqiFAFUTpEtCwPVd26PkC7ybOsJTWAA8HJaptm4BRXnQ82v%2F9Dxo1JkI99gogcs2LYW8A8DA%2BZNXh2uhX4CH3iEaQs0qK8G9lg0gVF%2Bb%2FuC7IUrACSceohY7bD%2Fn6iKt2sLbjRv43SpXD3YGkcBwmwvBP93fpA%2FeNWnGvjjt4RTnbuYWES0CwdLZM%2FyAKqNImFKH7t48ZIk4BiIjU65VRudqnmGSdf2w09ptvaHzzOP3Ps%2Ft6LgZexeepXYhkaAGS11WApp6XZz",
        "shareLandingUrl": "http://www.pandora.com/snails-house/ordinary-songs/snowlight/TR3JwgJx5zpjlxV?shareImp=true",
        "albumIdentity": "9b34b3a88bc91f287578f471772eec41",
        "trackType": "Track",
        "requestedModeId": 0,
        "artistExplorerUrl": "http://www.pandora.com/xml/music/artist/snails-house",
        "songName": "[Snowlight]",
        "nowPlayingStationAdUnit": "/4204/pand.android/prod.nowplaying",
        "stationId": "4539669987906336076",
        "songDetailUrl": "http://www.pandora.com/snails-house/ordinary-songs/snowlight/TR3JwgJx5zpjlxV?dc=232&ad=1:21:1:95713::0:0:1:1:862:065:CA:06061:2:0:0:0:0:1",
        "albumDetailUrl": "http://www.pandora.com/snails-house/ordinary-songs/ALdPqX7dkr2bqK6?dc=232&ad=1:21:1:95713::0:0:1:1:862:065:CA:06061:2:0:0:0:0:1",
        "songRating": 1,
        "userSeed": "R1250696",
        "trackGain": "-3.12",
        "albumExplorerUrl": "http://www.pandora.com/xml/music/album/snails-house/ordinary-songs",
        "pandoraId": "TR:12779196",
        "allowFeedback": true,
        "musicId": "S12779196",
        "categoryDescriptor": "",
        "programDescriptor": ""
	  }
	]
}
}
*/
			if (b.stat !== 'ok') {
				alert('Kill me. Error code: '+b.errorCode);
				return;
			}
			
			
			let p = b.result.items;
			this.playlist = [];
			p.forEach(l => {
				if (l.adToken) {
					// For now...
					return;
				}
				this.playlist.push(new PandoraSong({
					name: l.songName,
					token: l.trackToken,
					parentStation: stat,
					url: this.doTrim(l.songDetailUrl),
					rating: (l.songRating === 1?'liked': 'unrated'),
					album: new Album({
						name: l.albumName,
						coverUrl: l.albumArtUrl,
						url: l.albumDetailUrl
					}),
					artist: new Artist({
						name: l.artistName,
						url: l.artistDetailUrl
					}),
					audioLink: l.additionalAudioUrl || l.audioUrlMap.highQuality.audioUrl || l.audioUrlMap.mediumQuality.audioUrl || l.audioUrlMap.lowQuality.audioUrl
				}, this))
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
		})
	}
	
	doTrim(a) {
		if (SETT.getSetting('pandoraExtension', 'trimUrls')) {
			return a.split('?')[0];
		}
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
		this[this.currentlyPlaying.playing ? 'pause' : 'play']();
	}
	play = () => {
		this.currentlyPlaying.playing = true

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
		} else {
			if (this.sound) {
				this.sound.play();
			} else if (this.currentlyPlaying.song?.audioLink) {
				this.sound = new Howl({
					src: this.currentlyPlaying.song.audioLink,
					autoplay: true,
					html5: true,
					volume: (Math.min(Math.max(this.currentlyPlaying.volume, 0), 100) * 0.01),
					onend: this.skip
				});
			}
		}


		this.setStates({
			playing: this.currentlyPlaying.playing
		})	
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
				this.sound.stop();
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
		this.currentlyPlaying.time = 0;
		if (this.sound) {
			this.sound.seek(0);
		}
		this.setStates({
			time: this.currentlyPlaying.time
		})
	}
}

class PandoraSong  extends Song {
	constructor(a, parent) {
		super(a);
		this.parent = parent;
	}
	like = async () => {
		if (this.rating !== "liked") {
			let b = await this.parent.sendReq('station.addFeedback', {
				stationToken: this.parentStation.token,
				trackToken: this.token,
				isPositive: true
			}, true);
			this.rating = 'liked';
			this.feedbackId = b.result.feedbackId;
		} else {
			if (this.feedbackId) {
				this.parent.sendReq('station.removeFeedback', {
					feedbackId: this.feedbackId 
				}, true);
				this.rating = 'unrated';
			} else {
				let b = await this.parent.sendReq('station.getStation', {
					stationToken: this.parentStation.token,
					includeExtendedAttributes: true
				}, true);

				let t = b.result.feedback;
				if (t.thumbsUp[this.token]) {
					this.feedbackId = t.thumbsUp[this.token];
				} else if (t.thumbsDown[this.token]) {
					this.feedbackId = t.thumbsDown[this.token];
				}
				if (this.feedbackId) {
					this.parent.sendReq('station.removeFeedback', {
						feedbackId: this.feedbackId
					}, true);
					this.rating = 'unrated'
				}
			}
		}
		return this.rating;
	}
	dislike = async () => {
		if (this.rating !== "disliked") {
			let b = await this.parent.sendReq('station.addFeedback', {
				stationToken: this.parentStation.token,
				trackToken: this.token,
				isPositive: false
			}, true);
			this.rating = 'disliked';
			this.feedbackId = b.result.feedbackId;
		} else {
			if (this.feedbackId) {
				this.parent.sendReq('station.removeFeedback', {
					feedbackId: this.feedbackId 
				}, true);
				this.rating = 'unrated';
			} else {
				let b = await this.parent.sendReq('station.getStation', {
					stationToken: this.parentStation.token,
					includeExtendedAttributes: true
				}, true);

				let t = b.result.feedback;
				if (t.thumbsUp[this.token]) {
					this.feedbackId = t.thumbsUp[this.token];
				} else if (t.thumbsDown[this.token]) {
					this.feedbackId = t.thumbsDown[this.token];
				}
				if (this.feedbackId) {
					this.parent.sendReq('station.removeFeedback', {
						feedbackId: this.feedbackId
					}, true);
					this.rating = 'unrated';
				}
			}
		}
		return this.rating;
	}
	download = () => {
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
		return this.rating;
	}
}

class PandoraStation extends Station {
	constructor(a, parent) {
		super(a);
		this.parent = parent;
	}
	play = () => {
		this.parent.playStation(this);
	}
}

export {
	PandoraExtension,
	PandoraSong,
	PandoraStation
}

export default PandoraExtension;
