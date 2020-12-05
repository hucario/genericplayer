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
						return [
							{
								saveAs: 'settings',
								title: 'GenericPlayer',
								defaults: {
				
								},
								sections: [
									{
										title: 'General Settings',
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
												rawName: 'httpsonly'
											}
										]
									}
								]
							},
							new Popup().settingsPage,
							new SampleExtension().settingsPage
						]
					},
					registerSettingsPage(page) {
						
					},
					getSetting(daemon, key) {
						console.log(daemon, key);
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
						if (!this.__store.timeouts[daemon]) {
							this.__store.timeouts[daemon] = {}
						}
						if (this.__store.timeouts[daemon][key]) {
							return value;
						}
						this.__store.timeouts[daemon][key] = setTimeout(() => {
							this.__set(daemon, key, value);
							delete this.__store.timeouts[daemon][key];
						}, 1500)
						return value;
					},
					__set(daemon, key, value) {
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
		this.state.settings = yeah.getAllSettings();
		for (let key in this.state.inpSettings) {
			for (let i = 0; i < this.state.inpSettings[key].sections.length; i++) {
				for (let p = 0; p < this.state.inpSettings[key].sections[i].fields.length; p++) {
					this.settingsByRawName[this.state.inpSettings[key].saveAs] = this.settingsByRawName[this.state.inpSettings[key].saveAs] ?? {}
					this.settingsByRawName[this.state.inpSettings[key].saveAs][
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
						this.setCSSVar(this.settingsByRawName[key][nkey].rawName, 
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
		console.log(key, value);
		document.documentElement.style.setProperty("--" + key, value);
	}
	getCSSVar = (key) => {
		let x = getComputedStyle(document.documentElement).getPropertyValue("--"+key);
		x = (x + "").trim();
		console.log(key, x);
		return x;
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
		for (let i = 0; i < inpSettings.length; i++) {
			if (!inpSettings[i].saveAs || !inpSettings[i].sections) {
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
							defaultValue={this.state.settings[inpSettings[i].saveAs]?.[theseFields[b].rawName] ?? "unset"}
							changeWith={(e) => {
								yeah.setSetting(inpSettings[i].saveAs, theseFields[b].rawName, e);	
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