import React from 'react';
import {SampleExtension, SampleStation, SampleSong} from './sampleextension'
import History from './history'

const activeExtension = {
	'Extension': new SampleExtension(),
	'Station': SampleStation,
	'Song': SampleSong
};

class Popup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}

		this.login = this.login.bind(this);
		this.getPageOn = this.getPageOn.bind(this);
		this.navLeft = this.navLeft.bind(this);
		this.navRight = this.navRight.bind(this);

		this.prepState()
	}
	prepState() {
		if (typeof this.props.pageOn === "undefined") {
			if (typeof this.props.loggedIn === "undefined") {
				this.setState({
					pageOn: 3
				})
			} else {
				this.setState({
					pageOn: (this.props.loggedIn?1:3)
				})
			}
		} else {
			this.setState({
				pageOn: this.props.pageOn
			})
		}
	}
	getPageOn() {
		if (typeof this.state.pageOn === "undefined") {
			this.prepState();
		}
		return this.state.pageOn;
	}
	navLeft() {
		this.setState({
			pageOn: this.getPageOn() - 1
		})
	}
	navRight() {
		this.setState({
			pageOn: this.getPageOn() + 1
		})
	}
	login(e) {
		e.preventDefault();
		this.navLeft();
	}
	render() {
	return (
		<>
		<main id="main">
			<div id="slider" style={{
				right: `calc(var(--width) * ${this.getPageOn()}`
			}}>
				<section id="recents">
					<div className="topbar">
						<h1>Recent songs</h1>
						<div className="separator"></div>
						<input type="checkbox" id="listgrid" className="bx bx-list-ul"></input>
					</div>
					<History activeExtension={activeExtension}/>
				</section>
				<section id="player">
					<div id="attribution">
						<div id="songname">Johnny B. Goode</div>
						<div id="albumname">Johnny B. Goode Sessions</div>
						<div id="artistname">Chuck Berry</div>
					</div>
					<a id="albumLink" href="#thisShouldBeChangedViaJS">
						<img alt='Album art for song.' id="albumArt" src="./sample/johnny_b_goode.jpg" />
					</a>
					<div id="seekBar">
						<div id="seekPrevious"></div>
						<input id="seekControl" type="range" min="0" max="100" defaultValue="50" />
					</div>

					<div id="controls">
						<div id="leftControls">
							<button id="repeat" className="bx bx-repeat"></button>
							<button id="like" className="bx bx-like"></button>
						</div>
						<div id="centralControls">
							<button id="replay" className="bx bx-skip-previous"></button>
							<button id="play" className="bx bx-play"></button>
							<button id="skip" className="bx bx-skip-next"></button>
						</div>
						<div id="rightControls">
							<button id="dislike" className="bx bx-dislike"></button>
							<button id="shuffle" className="bx bx-shuffle"></button>
						</div>
					</div>

					<div id="volume">
						<button id="mute" className="bx bxs-volume-full"></button>
						<div id="volumeBar">
							<div id="volumePrevious"></div>
							<input id="volumeControl" type="range" min="0" max="100" />
						</div>
					</div>

				</section>
				<section>
					<div className="topbar">
						<h1>Stations</h1>
						<input id="search" placeholder="Search..." />
						<button className="bx bx-refresh" id="refresh"></button>
						<input type="checkbox" id="listgrid2" className="bx bx-list-ul"></input>
					</div>
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
						<a id="butwhytho" href="#">why should I trust you with my login credentials</a>
					</div>
					<div id="loginExplanation">
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
						<a id="closeExp" href="#">back</a>
					</div>
				</section>
			</div>

			<div id="goleftcontainer">
				<button 
					id="goleft" 
					className={
						`bx bxs-left-arrow${
							this.getPageOn()>0 &&
							this.getPageOn()!==3 ?
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
							this.getPageOn()<2 ?
							"":" naw"
						}`
					}
					onClick={
						this.navRight
					} />
			</div>
			
		</main>
		<div id="devtools">
			<button id="vh">Vary height</button>
			<button id="vw">Vary width</button>
			<button id="pop">Populate history</button>
		</div>
		<script src="tabs.js"></script>
		<script src="script.js"></script>
		</>
			)
	}
};

export default Popup; 