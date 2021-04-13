// Packages
//#region

import React, { useEffect } from 'react'
import {
	render
} from 'react-dom';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useLocation
} from 'react-router-dom'
import Helmet from 'react-helmet'

import { Provider } from 'react-redux'
import store from './redux/store'

//#endregion

// Internal modules
//#region
import SettingsApp from './settings/settings'
import Popup from './popup/popup'
import settingsProvider from './settingsProvider'
import HomePage from './pages/home/'
import NotFoundPage from './pages/notfound/'
import SearchPage from './pages/search/'
import StationsPage from './pages/stations/'
import SideBar from './components/sidebar/'
import BottomBar from './components/bottombar/'
import AlbumPage from './pages/albumdetail/'
import ArtistPage from './pages/artistdetail/'
import TrendingPage from './pages/trending/'

import './main.css';

//#endregion

// Settings defaults
//#region
window.settingsProvider = settingsProvider;
localStorage.settingsPages = localStorage.settingsPages || JSON.stringify({
		popup: {
			title: 'Popup Settings',
			showReq: true,
			defaults: {
				blurredAlbumBackground: true,
				background: "#ffffff",
				"background-floating": "#ededed",
				"background-floating-higher": "#c2c2c2",
				"text-color": "#000000",
				"text-muted": "#383838",
				"hint-icon-color": "#ffc23d",
				"icon-color": "#000000",
				"active-icon-color": "#e6bf00",
				"accent-color": "#1dc98f",
				height: "580px",
				width: "500px",
				"font-size": "16px"
			},
			sections: [
				{
					title: 'Colors',
					fields: [
						{
							label: 'Blurred album background',
							sublabel: 'Puts a blurred album cover behind the player pane.',
							type: 'toggle',
							rawName: 'blurredAlbumBackground'
						},
						{
							label: 'Background color',
							sublabel: 'Color of the background of the player.',
							type: 'color',
							rawName: 'background'
						},
						{
							label: 'Secondary background color',
							sublabel: 'For inner components.',
							type: 'color',
							rawName: 'background-floating'
						},
						{
							label: 'Tertiary background color',
							sublabel: 'For components inside components.',
							type: 'color',
							rawName: 'background-floating-higher'
						},
						{
							label: 'Accent color',
							sublabel: 'The spice of life. Also the color of the seek and volume bar, among other things.',
							type: 'color',
							rawName: 'accent-color'
						},
						{
							label: 'Active icon color',
							sublabel: 'Shows when a button is active, e.g. the like button on a liked song.',
							type: 'color',
							rawName: 'active-icon-color'
						},
						{
							label: 'Inactive icon color',
							sublabel: 'Shows when a button is inactive, e.g. the dislike button on a liked song.',
							type: 'color',
							rawName: 'icon-color'
						},
						{
							label: 'Hint icon color',
							sublabel: 'Shows when a button is being hovered on.',
							type: 'color',
							rawName: 'hint-icon-color'
						},
						{
							label: 'Text color',
							sublabel: 'For normal text.',
							type: 'color',
							rawName: 'text-color'
						},
						{
							label: 'Muted text color',
							sublabel: 'For less important text.',
							type: 'color',
							rawName: 'text-muted'
						}
					]
				},
				{
					title: 'Sizings',
					fields: [
						{
							label: 'Player height',
							sublabel: 'Due to limitations placed by Chrome, the max height is 580px.',
							type: 'px',
							rawName: 'height',
							min:"100",
							max:"580"
						},
						{
							label: 'Player width',
							sublabel: 'This probably shouldn\'t be under 300px.',
							type: 'px',
							rawName: 'width',
							min:"100",
						},
						{
							label: 'Font size',
							sublabel: 'The default size of text',
							type: 'px',
							rawName: 'font-size',
							min:"1",
							max:"50"
						},
					]
				}
			]
		},
		"settings": {
			title: 'GenericPlayer',
			showReq: true,
			defaults: {
				"extSelect": "sampleExtension",
				"showLyrics": "true"
			},
			sections: [
				{
					fields: [
						{
							label: 'Streaming service',
							sublabel: 'Which streaming service to play from.',
							type: 'select',
							options: [
							{ value: 'sampleExtension', label: 'Sample Extension' },
							{ value: 'pandoraExtension', label: 'Pandora' },
							{ value: 'youtubeExtension', label: 'Youtube playlists'}
							],
							rawName: 'extSelect'
						},
						{
							label: 'Show lyrics',
							sublabel: 'Attempt to show lyrics. This would send your listening information to Genius.',
							type: 'toggle',
							rawName: 'showLyrics'
						}
					]
				}
			]
		},
		"sampleExtension": {
			title: 'SampleExtension Settings',
			showReq: [
				'settings',
				'extSelect',
				'sampleExtension'
			],
			defaults: {
				httpsOnly: true,
				historyLength: 20
			},
			sections: [
				{
					title: 'General',
					fields: [
						{
							label: 'Play on open',
							sublabel: 'When player page is opened, have player... playing.',
							type: 'toggle',
							rawName: 'doPlay'
						},
						{
							label: 'Play a random song',
							sublabel: 'do prepRandom()',
							type: 'toggle',
							rawName: 'doRandom'
						}
					]
				}
			]
		},
		"pandoraExtension": {
			title: 'Pandora Settings',
			showReq: [
				'settings',
				'extSelect',
				'pandoraExtension'	
			],
			defaults: {
				httpsOnly: true,
				historyLength: 20
			},
			sections: [
				{
					fields: [
						{
							label: 'Play ads',
							sublabel: 'We hate ads too, which is why this is off by default - but if you don\'t mind too much, please turn this on to support the artists you love <3',
							type: 'toggle',
							rawName: 'playAds'
						},
						{
							label: 'Trim tracking mess from links',
							sublabel: 'Pandora sends links with a bunch of unneeded query parameters appended to the end. Check this to trim those off.',
							type: 'toggle',
							rawName: 'trimUrls'
						},
						{
							label: 'History length',
							sublabel: 'Amount of songs to keep in history.',
							type: 'number',
							rawName: 'historyLength',
							min: 0,
							max: 999
						},
						
					]
				}
			]
		},
		youtubeExtension: {
			title: 'Youtube Settings',
			showReq: [
				'settings',
				'extSelect',
				'youtubeExtension'
			],
			defaults: {

			},
			sections: []
		}
	})
localStorage.settings = localStorage.settings || JSON.stringify({
	"popup": {
		"blurredAlbumBackground": "true",
		"background": "#ffffff",
		"background-floating": "#ededed",
		"background-floating-higher": "#c2c2c2",
		"text-color": "#000000",
		"text-muted": "#383838",
		"hint-icon-color": "#ffc23d",
		"icon-color": "#000000",
		"active-icon-color": "#e6bf00",
		"accent-color": "#1dc98f",
		"height": "580px",
		"width": "500px",
		"font-size": "16px"
	},
	"settings": {
		"extSelect": "youtubeExtension",
		"showLyrics": "true"
	},
	"sampleExtension": {
		"doPlay": "true",
		"doRandom": "true"
	},
	"pandoraExtension": {
		"httpsOnly": "true",
		"historyLength": "20",
		"trimUrls": true
	}
});
//#endregion

window.store = store

function App() {
	const location = useLocation();
	useEffect(() => {
		console.log('Page changed to '+location.pathname);

	},[location.pathname])
	return (<>
	<Switch>
		<Route path="/settings" component={SettingsApp} />
		<Route path="/popup" component={Popup} />
		<Route path="">
			<Helmet><link href='/main.css' rel='stylesheet' /></Helmet>
			<div className="growUp">
				<SideBar />
				<section id="main">
					<Switch>
						<Route path="/search/:id" component={SearchPage} />
						<Route path="/search" component={SearchPage} />
						<Route path="/stations" component={StationsPage} />
						<Route path="/trending" component={TrendingPage} />
						<Route path="/album/:id" component={AlbumPage} />
						<Route path="/artist/:id" component={ArtistPage} />
						<Route path="/" exact component={HomePage} />
						<Route path="" component={NotFoundPage} />
					</Switch>
				</section>
			</div>
			<BottomBar />
		</Route>
	</Switch>
		</>
	)
}

render((<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>),
	document.getElementById('app')
);