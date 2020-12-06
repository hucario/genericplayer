import React from 'react';
import {
	SampleExtension
} from './extensions/sampleextension.js'
import {
	Popup
} from './initpopupsettings.js'

import SettingsItem from './components/settingsitem.js';

/* polyfilling during dev because this sure ain't an extension yet */
// eslint-disable-next-line no-unused-vars
let chrome =  {
	extension: {
		getBackgroundPage: function() {
			return {
				getCurrentExtension() {
					let x = new SampleExtension();
					return x;
				},
				settings: {
					getSettingsPages() {
						return {
							"settings": {},
							"sampleExtension": new SampleExtension().settingsPage,
							"pandoraExtension": {},
							"popup": new Popup().settingsPage,
						}
					},
					registerSettingsPage(page) {
						
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
					setSetting(daemon, key, value) {
						this.__store.toSet[daemon] = this.__store.toSet[daemon] ?? {}
						this.__store.toSet[daemon][key] = value;
						if (!this.__store.timeouts[daemon]) {
							this.__store.timeouts[daemon] = {}
						}
						if (this.__store.timeouts[daemon][key]) {
							clearTimeout(this.__store.timeouts[daemon][key]);
						}
						this.__store.timeouts[daemon][key] = setTimeout(() => {
							this.__set(daemon, key, this.__store.toSet[daemon][key]);
							delete this.__store.timeouts[daemon][key];
							delete this.__store.toSet[daemon][key];
						}, 1500)
						return value;
					},
					__set(daemon, key, value) {
						if (value == null) {
							return;
						}
						fetch(`http://localhost:8085/setting/${
								encodeURIComponent(daemon)
							}/${
								encodeURIComponent(key)
							}/${
								encodeURIComponent(value)
							}`, {
								method: "POST"
							});
					},
					__store: {
						timeouts: {

						},
						toSet: {

						}
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

let yeah = chrome.extension.getBackgroundPage().settings;

export default class SettingsApp extends React.Component {
	settingsByRawName = {}
	constructor(props) {
		super(props);


		this.state = {
			activeExtension: chrome.extension.getBackgroundPage().getCurrentExtension(),
			colorStandardizerCanvas: document.createElement('canvas').getContext("2d"),
			settings: {}
		}

		this.state.inpSettings = yeah.getSettingsPages();
		this.state.inpSettings.settings = {
			title: 'GenericPlayer',
			showReq: () => {
				return true;
			},
			defaults: {

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
		}
		this.state.inpSettings.pandoraExtension = {
			title: 'Pandora Settings',
			showReq: (settings) => {
				if (!settings.settings) {
					return false;
				}
				return ( settings.settings.extSelect === "pandoraExtension")
			},
			defaults: {
				httpsOnly: true,
				historyLength: 20
			},
			sections: [
				{
					fields: [
						{
							label: 'Only use secured connections',
							sublabel: 'HTTP may be used if HTTPS is unavailable and this is unchecked.',
							type: 'toggle',
							rawName: 'httpsOnly'
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
		}

		this.state.settings = yeah.getAllSettings();
		for (let key in this.state.inpSettings) {
			for (let i = 0; i < this.state.inpSettings[key].sections.length; i++) {
				for (let p = 0; p < this.state.inpSettings[key].sections[i].fields.length; p++) {
					this.settingsByRawName[key] = this.settingsByRawName[key] ?? {}
					this.settingsByRawName[key][
						this.state.inpSettings[key].sections[i].fields[p].rawName
					] = this.state.inpSettings[key].sections[i].fields[p]
				}
			}
		}
		for (let key in this.state.settings) {
			if (this.settingsByRawName[key]) {
				for (let nkey in this.state.settings[key]) {
					if (this.settingsByRawName[key][nkey] && 
						(
							this.settingsByRawName[key][nkey].type === "color" ||
							this.settingsByRawName[key][nkey].type === "px"
						)
					) {
						this.setCSSVar(
							this.settingsByRawName[key][nkey].rawName, 
							this.state.settings[key][nkey]
						)
					}
				}
			}
		}

		// D E B U G
		// @ts-ignore
		window.getVar = this.getVar;
		// @ts-ignore
		window.gaming = yeah;
	}
	setCSSVar = (key,value) => {
		document.documentElement.style.setProperty("--" + key, value);
	}
	getCSSVar = (key) => {
		let x = getComputedStyle(document.documentElement).getPropertyValue("--"+key);
		x = (x + "").trim();
		console.log(key, x);
		return x;
	}
	updateSettings = (daemon, key, value) => {
		yeah.setSetting(daemon, key, value)
		if (this.state.settings[daemon]) {
			this.setState((prevState) => {
				return {
					settings: {
						...prevState.settings,
						[daemon]: {
							...prevState.settings[daemon],
							[key]: value
						}
					}
				}
			})
		} else {
			this.setState((prevState) => ({
				settings: {
					...prevState.settings,
					[daemon]: {
						[key]: value
					}
				}
			}))
		}
		
	}
	standardize_color = (str) => {
		if (
			str.includes('px') ||
			str.includes('em') ||
			str.includes('vh') ||
			str.includes('vw')			
		) {
			// A A A A A
			return str.trim();
		}
		var ctx = this.state.colorStandardizerCanvas;
		ctx.fillStyle = str;
		return ctx.fillStyle;
	}
	render() {
		let inpSettings = this.state.inpSettings
		let segs = []
		let count = 2;
		for (let i in inpSettings) {
			if (!inpSettings[i].sections || !inpSettings[i].showReq(this.state.settings)) {
				continue;
			}
			if (inpSettings[i].title) {
				segs.push(
					<h1 
						key={count++}
					>
						{inpSettings[i].title}
					</h1>
				)
			}
			for (let f = 0; f < inpSettings[i].sections.length; f++) {
				let theseFields = inpSettings[i].sections[f].fields,
					localSegments = []

				segs.push(
					<h2 
						key={count++}
					>
						{inpSettings[i].sections[f].title}
					</h2>
				)
				if (!inpSettings[i].sections[f].fields) {
					continue;
				}
				for (let b = 0; b < theseFields.length; b++) {
					localSegments.push(
						<SettingsItem
							label={theseFields[b].label}
							label-secondary={theseFields[b].sublabel}
							type={theseFields[b].type}
							min={theseFields[b].min}
							max={theseFields[b].max}
							toChange={theseFields[b].rawName}
							defaultValue={
								this.state.settings[i]?.[theseFields[b].rawName] ?? 
								inpSettings[i].defaults[theseFields[b].rawName] ??
								""
							}
							changeWith={(e) => {
								if (
									theseFields[b].type === "color" ||
									theseFields[b].type === "px"
								) {

									this.setCSSVar(
										theseFields[b].rawName,
										e
									)
								}
								this.updateSettings(i, theseFields[b].rawName, e);	
							}}
							key={count++}
							options={theseFields[b].options ?? null}
							stdColor={this.standardize_color}
						/>)
				}
				segs.push(
					<ul 
						key={count++}
					>
						{localSegments}
					</ul>
				)
			}
		}
		return (
		<>
			{segs}
		</>
			)
	}
};