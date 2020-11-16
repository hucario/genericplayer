import React from 'react';
import {SampleExtension} from './extensions/sampleextension.js'
import History from './components/history/history'
import IconToggle from './components/icontoggle/icontoggle.js';
import Range from './components/range/range.js';
import Stations from './components/stations/stations.js';

/* polyfilling during dev because this sure ain't an extension yet */
// eslint-disable-next-line no-unused-vars
let chrome =  {
	extension: {
		getBackgroundPage: function() {
			return {
				getCurrentExtension() {
					let x = new SampleExtension();
					x.prepareRandom(); // for indev testing
					return x;
				}
			}
		}
	}
}

class Popup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeExtension: chrome.extension.getBackgroundPage().getCurrentExtension(),
			recentsGridMode: false,
			stationsGridMode: false,
			showingLoginExp: false,
			loggedIn: this.props.loggedIn || false
		}

		this.state.activeExtension.forceUpdateList.push(this.forceUpdate.bind(this));

		this.login = this.login.bind(this);
		this.navLeft = this.navLeft.bind(this);
		this.navRight = this.navRight.bind(this);
		this.factory = this.factory.bind(this);
		this.onerror = this.onerror.bind(this);
		this.seekStart = this.seekStart.bind(this);
		this.seekEnd = this.seekEnd.bind(this);

		
		if (typeof this.props.pageOn === "undefined") {
			if (typeof this.props.loggedIn === "undefined") {
				this.state.pageOn = 3
			} else {
				this.state.pageOn = (this.props.loggedIn?1:3)
			}
		} else {
			this.state.pageOn = this.props.pageOn;
		}
	}
	onerror(e) {
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
	navLeft() {
		this.setState({
			pageOn: this.state.pageOn - 1
		})
	}
	navRight() {
		this.setState({
			pageOn: this.state.pageOn + 1
		})
	}
	async login(e) {
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
	factory(a) {
		return function() {
			a.apply(this,arguments);
		}.bind(this)
	}
	seekStart() {
		this.setState({
			wasPlaying: this.state.activeExtension.currentlyPlaying.playing
		})
		this.state.activeExtension.pause();		
	}
	seekEnd() {
		if (this.state.wasPlaying) {
			this.state.activeExtension.play();
		}
	}
	render() {
	return (
		<React.Fragment>
			<div id="slider" style={{
				right: `calc(var(--width) * ${this.state.pageOn}`
			}}>
				<section id="recents" className={(this.state.recentsGridMode?'gridmode':'')}>
					<div className="topbar">
						<h1>Recent songs</h1>
						<div className="separator"></div>
						<IconToggle 
							icon="bx-list-ul"
							onToggle={this.factory(function() {
								this.setState({
									recentsGridMode: !this.state.recentsGridMode
								});
							})}
							checked={true}
						/>
					</div>
					<History activeExtension={this.state.activeExtension}/>
				</section>
				<section id="player">
					<div id="attribution">
						<div id="songname">{
							this.state.loggedIn && 
							this.state.activeExtension.currentlyPlaying.song && 
							this.state.activeExtension.currentlyPlaying.song.name
						}</div>
						<div id="albumname">{
							this.state.loggedIn && 
							this.state.activeExtension.currentlyPlaying.song && 
							this.state.activeExtension.currentlyPlaying.song.album && 
							this.state.activeExtension.currentlyPlaying.song.album.name
						}</div>
						<div id="artistname">{
							this.state.loggedIn && 
							this.state.activeExtension.currentlyPlaying.song && 
							this.state.activeExtension.currentlyPlaying.song.artist && 
							this.state.activeExtension.currentlyPlaying.song.artist.name
						}</div>
					</div>
					<a id="albumLink" href={
							this.state.loggedIn && 
							this.state.activeExtension.currentlyPlaying.song && 
							this.state.activeExtension.currentlyPlaying.song.album && 
							this.state.activeExtension.currentlyPlaying.song.album.url
						}>
						<img alt='Album art for song.' id="albumArt" src={
							this.state.loggedIn && 
							this.state.activeExtension.currentlyPlaying.song && 
							this.state.activeExtension.currentlyPlaying.song.album && 
							this.state.activeExtension.currentlyPlaying.song.album.coverUrl
						} />
					</a>
					<Range 
						id="seekBar" 
						max={
							this.state.activeExtension.currentlyPlaying.song && 
							this.state.activeExtension.currentlyPlaying.song.length
						}
						value={this.state.activeExtension.currentlyPlaying.time}
						onMouseDown={
							this.seekStart
						}
						onMouseUp={
							this.seekEnd
						}
					/>

					<div id="topControls">
							<button id="back" className="bx bx-skip-previous"></button>
							<button 
								id="play" 
								className={"bx "+(this.state.activeExtension.currentlyPlaying.playing?'bx-pause':'bx-play')}
								onClick={this.state.activeExtension.togglePlay}
							/>
							<button 
								id="skip" 
								className="bx bx-skip-next"
								onClick={this.state.activeExtension.skip}
							/>
					</div>
					<div id="bottomControls">
						<button id="repeat" className="bx bx-repeat"></button>
						<button 
							id="like" 
							className="bx bx-like"
							onClick={
								this.state.activeExtension.currentlyPlaying.song &&
								this.state.activeExtension.currentlyPlaying.song.like
							}
						/>
						<button id="dislike" className="bx bx-dislike"></button>
						<button id="shuffle" className="bx bx-shuffle"></button>
					</div>

					<div id="volume">
						<button id="mute" className="bx bxs-volume-full"></button>
						<Range 
							id="volumeBar" 
							value={
								this.state.loggedIn && 
								this.state.activeExtension.currentlyPlaying.volume
							}
							max="100"
						/>
					</div>

				</section>
				<section className={this.state.stationsGridMode?'gridmode':''}>
					<div className="topbar">
						<h1>Stations</h1>
						<input id="search" placeholder="Search..." />
						<button className="bx bx-refresh" id="refresh"></button>
						<IconToggle 
							icon="bx-list-ul"
							onToggle={this.factory(function() {
								this.setState({
									stationsGridMode: !this.state.stationsGridMode
								});
							})}
						/>
					</div>
					{this.state.loggedIn && 
					<Stations 
						activeExtension={this.state.activeExtension}
						onerror={this.onerror}
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
							onClick={this.factory(() => {
								this.setState({
									showingLoginExp: true
								})
							})}
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
						<button 
							id="closeExp"
							onClick={
								this.factory(() => {
									this.setState({
										showingLoginExp: false
									})
								})
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

export default Popup; 