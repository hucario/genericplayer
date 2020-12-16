/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {SampleExtension} from './extensions/sampleextension.js'
import History from './components/history/history'
import IconToggle from './components/icontoggle/icontoggle.js';
import Range from './components/range/range.js';
import Stations from './components/stations/stations.js';

/* polyfilling during dev because this sure ain't an extension yet */
// eslint-disable-next-line no-unused-vars
let chromea =  {
	extension: {
		getBackgroundPage: () => {
			return {
				getCurrentExtension() {
					let x = new SampleExtension();
					x.prepareRandom(); // for indev testing
					return x;
				},
				settings: {
					getSettingsPages() {
						var request = new XMLHttpRequest();
						request.open('GET', `http://localhost:8085/settingspages/`, false);  // `false` makes the request synchronous
						request.send(null);
						
						if (request.status === 200) {
							return JSON.parse(request.responseText);
						}
						return null;
					},
					getSetting(daemon, key) {
						// damn I hate using a synchronous xmlhttprequest, fetch is so much better, but...
						// I need a synchronous solution because this is literally only for testing
						var request = new XMLHttpRequest();
						request.open('GET', `http://localhost:8085/setting/${encodeURIComponent(daemon)}/${encodeURIComponent(key)}`, false);  // `false` makes the request synchronous
						request.send(null);
						
						if (request.status === 200) {
							return request.responseText;
						}
						return null;
					},
					getAllSettings() {
						var request = new XMLHttpRequest();
						request.open('GET', `http://localhost:8085/settings/`, false);
						request.send(null);
						
						if (request.status === 200) {
							return JSON.parse(request.responseText);
						}
						return null;
					}
				}
			}
		}
	}
}
let yeah = chromea.extension.getBackgroundPage().settings

export default class Popup extends React.Component {
	settingsByRawName = {}
	constructor(props) {
		super(props);
		this.state = {
			activeExtension: chromea.extension.getBackgroundPage().getCurrentExtension(),
			recentsGridMode: false,
			stationsGridMode: false,
			showingLoginExp: false,
			loggedIn: false,
			setSeekValue: (a) => {},
			setVolume: (a) => {},
			currentStation: null,
			time: 0,
			volume: 100,
			currentSong: null,
			playing: false,
			rating: 'unrated',
			repeatOne: false,
			stations: []
		}

		this.state.settings = yeah.getAllSettings().popup ?? {};
		this.state.inpSettings = yeah.getSettingsPages().popup;

		for (let i = 0; i < this.state.inpSettings.sections.length; i++) {
			// for each section
			let p = this.state.inpSettings.sections[i];
			for (let b = 0; b < p.fields.length; b++) {
				// for each field in each section
				this.settingsByRawName[p.fields[b].rawName] = p.fields[b];
				if (this.state.settings[p.fields[b].rawName] && (p.fields[b].type === "px" || p.fields[b].type === "color")) {
					document.documentElement.style.setProperty("--" + p.fields[b].rawName, this.state.settings[p.fields[b].rawName]);
				}
			}
		}
		console.log(this.settingsByRawName);

		this.state.activeExtension.addSetStateCb(this.wrappedSetState.bind(this));
		this.state.activeExtension.getStations().then(e => {
			this.setState({
				stations: e
			})
		})
		this.state.pageOn = (this.state.activeExtension.loggedIn || this.state.loggedIn || this.props.loggedIn)?1:3
	}
	wrappedSetState = (obj) => {
		//console.log(obj)
		this.setState(obj);
	}
	onerror = (e) => {
		switch(e) {
			case "User is not logged in.":
				this.setState({
					pageOn: 3,
					loggedIn: false
				})
				break;
			default:
				return;
		}
	}
	navLeft = () => {
		this.setState({
			pageOn: this.state.pageOn - 1
		})
	}
	navRight = () => {
		this.setState({
			pageOn: this.state.pageOn + 1
		})
	}
	login = async (e) => {
		e.preventDefault();
		let x = await this.state.activeExtension.login('hughy62@gmail.com', 'monkey').catch((e) => {

		})
		if (!x) {
			return;
		}
		this.setState({
			loggedIn: true
		})
		this.navLeft();
	}
	seekStart = () => {
		this.setState({
			wasPlaying: this.state.playing
		})
		this.state.activeExtension.pause();		
	}
	seekEnd = (e) => {
		if (this.state.wasPlaying) {
			this.state.activeExtension.play();
		}
		this.state.activeExtension.seek(e)
	}
	formatTime = (duration) => {
		/*
		 * Because I'm uncreative, 
		 * https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds
		 */
			// Hours, minutes and seconds
			var hrs = ~~(duration / 3600);
			var mins = ~~((duration % 3600) / 60);
			var secs = ~~duration % 60;

			// Output like "1:01" or "4:03:59" or "123:03:59"
			var ret = "";

			if (hrs > 0) {
				ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
			}

			ret += "" + mins + ":" + (secs < 10 ? "0" : "");
			ret += "" + secs;
			return ret;
	}
	handleGetValueSetterAaa = (setvalue) => {
		this.setState({
			setSeekValue: setvalue
		})
	}
	likeCurrentSong = async () => {
		this.setState({
			rating: 'liked'
		});
		if (this.state.currentSong) {
			let x = await this.state.currentSong.like();
			this.setState({
				rating: x
			})
		}
	}
	dislikeCurrentSong = async () => {
		this.setState({
			rating: 'disliked'
		})
		if (this.state.currentSong) {
			let x = await this.state.currentSong.dislike();
			this.setState({
				rating: x
			})
		}
	}
	volumeClick = () => {
		if (this.state.volume < 1) {
			this.setState({
				volume: this.state.prevVolume || 100
			})
		} else {
			this.setState({
				prevVolume: this.state.volume,
				volume: 0
			})
		}
	}
	changeVolume = async (e) => {
		this.setState({
			volume: e
		})
	}
	setVolumeCB = (e) => {
		this.setState({
			setVolume: e
		})
	}
	goToPage = (e) => {
		this.setState({
			pageOn: e
		})
	}
	render() {
		this.state.setSeekValue(this.state.time)
		this.state.setVolume(this.state.volume)

		// @ts-ignore
		window.mainState = this.state

		return (
		<React.Fragment>
			{this.state.settings.blurredAlbumBackground &&
						<img id="bg" 
							alt=""
							src={
								this.state.currentSong &&
								this.state.currentSong.album &&
								this.state.currentSong.album.coverUrl
							}
						/>
					}
			<div id="slider" style={{
				right: `calc(var(--width) * ${this.state.pageOn}`
			}}>
				<section id="recents" className={(this.state.recentsGridMode?'gridmode':'')}>
					<div className="topbar">
						<h1>Recent songs</h1>
						<div className="separator"></div>
						<IconToggle 
							icon="bx-list-ul"
							onToggle={() => {
								this.setState({
									recentsGridMode: !this.state.recentsGridMode
								});
							}}
							checked={true}
						/>
					</div>
					<History 
						activeExtension={this.state.activeExtension}
					/>
				</section>
				<section id="player">
					<a 
						id="albumLink" 
						href={
							this.state.currentSong && 
							this.state.currentSong.album && 
							this.state.currentSong.album.url
						}
					>
						<img 
							alt='Album art for song.' 
							id="albumArt" 
							src={
								this.state.currentSong && 
								this.state.currentSong.album && 
								this.state.currentSong.album.coverUrl
							}
						/>
					</a>
					<div id="attribution">
						<a 
							id="songname"
							href={
								this.state.currentSong &&
								(() => {
									if (this.state.currentSong.url === undefined) {
										return null;
									} else if (this.state.currentSong.url === "") {
										return null;
									} else {
										return this.state.currentSong.url;
									}
								})()
							}
						>{
							this.state.currentSong && 
							this.state.currentSong.name
						}</a>
						<a 
							id="albumname"
							href={
								this.state.currentSong &&
								this.state.currentSong.album &&
								(() => {
									if (this.state.currentSong.album.url === undefined) {
										return null;
									} else if (this.state.currentSong.album.url === "") {
										return null;
									} else {
										return this.state.currentSong.album.url;
									}
								})()
							}
						>{
							this.state.currentSong && 
							this.state.currentSong.album &&
							this.state.currentSong.album.name
						}</a>
						
						<a 
							id="artistname"
							href={
								this.state.currentSong &&
								this.state.currentSong.artist &&
								(() => {
									if (this.state.currentSong.artist.url === undefined) {
										return null;
									} else if (this.state.currentSong.artist.url === "") {
										return null;
									} else {
										return this.state.currentSong.artist.url;
									}
								})()
							}
						>{
							this.state.currentSong && 
							this.state.currentSong.artist && 
							this.state.currentSong.artist.name
						}</a>
					</div>
					<Range 
						id="seekBar" 
						max={
							this.state.currentSong && 
							this.state.currentSong.length
						}
						value={this.state.time}
						onMouseDown={
							this.seekStart
						}
						onMouseUp={
							this.seekEnd
						}
						setValueCB={
							this.handleGetValueSetterAaa
						}
						title={	
							this.state.currentSong && 
							this.formatTime(this.state.time) + ' / ' +
							this.formatTime(this.state.currentSong.length)
						}
						aria-label={
							"Seek slider. \n" +
							"Is actually a range so should be accessible. \n" +
							"One unit of this is equivalent to one second of song time: "+
							"if you want to seek to one minute and twenty seconds, "+
							"you would change this to 80."
						}
					/>

					<div id="topControls">
							<button 
								aria-label={
									"Skip previous"
								}
								className="bx bx-skip-previous"
								onClick={
									this.state.activeExtension.backSong
								}
							/>
							<button 
								aria-label={
									this.state.playing?'Pause':'Play'
								}
								id="play" 
								className={"bx "+(this.state.playing?'bx-pause':'bx-play')}
								onClick={this.state.activeExtension.togglePlay}
							/>
							<button 
								aria-label={
									'Skip'
								}
								className="bx bx-skip-next"
								onClick={this.state.activeExtension.skip}
							/>
					</div>
					<div id="bottomControls">
						<button 
							aria-label={
								'Repeat'
							}
							onClick={
								() => {
									this.state.activeExtension.setRepeat(!this.state.repeatOne)
								}
							}
							className={
								"bx bx-repeat" + (this.state.repeatOne?' active':'')
							}
						/>
						<button 
							aria-label={
								this.state.rating==='liked'?'Remove like':'Like'
							}
							className={
								"bx bx" + 
								(this.state.rating === "liked"?'s-like active':'-like')
							
							}
							onClick={
								this.likeCurrentSong
							}
						/>
						<button 
							aria-label={
								'Download'
							}
							className="bx bxs-download"
							onClick={
								() => {
									this.state.currentSong &&
									this.state.currentSong.download()
								}
							}
						/>
						<button
							aria-label={
								this.state.rating==='disliked'?'Remove dislike':'Dislike'
							}
							className={
								"bx bx"+ 
								(this.state.rating === "disliked"?'s-dislike active':'-dislike')}
							onClick={
								this.dislikeCurrentSong
							}
						/>
						<a
							id="settingsCog"
							href="./settings"
							className="bx bx-cog"
						>Settings</a>
					</div>

					<div id="volume">
						<button 
							aria-label={
								this.state.volume < 1?'Unmute':'Mute'
							}
							className={
								"bx bxs-volume-" +	(this.state.volume < 1?"mute":'full')
							}
							id="mute"
							onClick={this.volumeClick}
						/>
						<Range 
							aria-label={
								"Volume slider. \n" +
								"Is actually a range so should be accessible. \n" +
								"Max volume is 100 units: "+
								"if you want to set volume to 30 percent, "+
								"you would change this to 30."
							}
							id="volumeBar" 
							value={
								this.state.volume
							}
							max="100"
							title={
								this.state.volume
							}
							inputEvent={
								this.changeVolume
							}
							setValueCB={
								this.setVolumeCB
							}
						/>
					</div>

				</section>
				<section className={this.state.stationsGridMode?'gridmode':''}>
					<div className="topbar">
						<h1>Stations</h1>
						<input id="search" placeholder="Search..." />
						<button 
							className={
								"bx bx-refresh" +
								(this.state.refreshing?' bx-spin':'')
							}
							id="refresh"
							onClick={
								() => {
									this.state.activeExtension.getStations().then((e) => {
										this.setState({
											stations: e,
											refreshing: false
										})
									})
									this.setState({
										refreshing: true
									})
								}
							}
						></button>
						<IconToggle 
							aria-label={
								'Station grid mode checkbox'
							}
							icon="bx-list-ul"
							onToggle={() => {
								this.setState({
									stationsGridMode: !this.state.stationsGridMode
								});
							}}
						/>
					</div>
					{this.state.loggedIn && 
					this.state.stations &&
					this.state.stations.length > 0 &&
					<Stations 
						stations={this.state.stations}
						ext={this.state.activeExtension}
						onerror={this.onerror}
						goToPage={this.goToPage}
					/>
					}
				</section>
				<section id="loginSection">
					<div id="loginMain">
						<h1>Sign in</h1>
						<form id="login">
							<span><label className="bx bx-envelope inputicon" htmlFor="email"></label><input placeholder="email" autoComplete="username" id="email" type="email" className="bx bx-envelope" /></span>
							<span><label className="bx bxs-lock inputicon" htmlFor="pw"></label><input placeholder="password" autoComplete="current-password" id="pw" type="password" /></span>
							<button 
								type="submit" 
								id="loginButton"
								onClick={
									this.login
								}>Log in</button>
						</form>
						<button 
							id="butwhytho"
							onClick={() => {
								this.setState({
									showingLoginExp: true
								})
							}}
						>why should I trust you with my login credentials</button>
					</div>
					<div 
						id="loginExplanation"
						style={{
							bottom: (this.state.showingLoginExp?'0px':'var(--height)')
						}}
					>
						<h1>why should I trust you with my information</h1>
						<hr />
						<p>
							honestly man I don't know either, but here's a few reasons why it's less likely I'd try to screw you over:
						</p>
						<ol>
							<li>Extensions go through a "thorough" and "completely secure" (not thorough, barely does anything, wildly inconsistent) vetting process before they go on the Chrome Web Store / Firefox Addons Store. Nothing bad could POSSIBLY get through that impassable filter.</li>
							<li><strong>Because the code is open-source, you can see everywhere I handle your login details.</strong></li>
							<li>Yeah I don't have another point but I wanted it to look like I have more than two points</li>
						</ol>
						also hey, you're cool for actually caring about your privacy 
						<img 
							src="https://discord.com/assets/5f80f04e6ee97feebdd00feff92ced82.svg" 
							alt="sunglasses emoji"
							style={{
								width: "1.5em", 
								height: "1.5em",
								verticalAlign: "middle",
								marginLeft: "0.5em"
							}}
						/>
						<button 
							id="closeExp"
							onClick={
								() => {
									this.setState({
										showingLoginExp: false
									})
								}
							}
						>back</button>
					</div>
				</section>
			</div>

			<div id="goleftcontainer">
				<button 
					id="goleft" 
					className={
						`bx bxs-left-arrow${
							this.state.pageOn>0 &&
							this.state.pageOn!==3 ?
							"":" naw"
						}`
					}
					onClick={
						this.navLeft
					} />
			</div>			
			<div id="gorightcontainer">
				<button 
					id="goright" 
					className={
						`bx bxs-right-arrow${
							this.state.pageOn<2 ?
							"":" naw"
						}`
					}
					onClick={
						this.navRight
					} />
			</div>
		</React.Fragment>
			)
	}
};