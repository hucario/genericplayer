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
				}
			}
		}
	}
}

export default class SettingsApp extends React.Component {
	constructor(props) {
		super(props);


		this.state = {
			activeExtension: chrome.extension.getBackgroundPage().getCurrentExtension(),
			colorStandardizerCanvas: document.createElement('canvas').getContext("2d"),
			settings: {}
		}

		this.state.inpSettings = [
			{
				saveAs: 'settings',
				title: 'GenericPlayer',
				setVar: () => {},
				getVar: () => {},
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
			this.state.activeExtension.settingsPage
		]

		for (let i = 0; i < this.state.inpSettings.length; i++) {
			localStorage[this.state.inpSettings[i].saveAs + 'Settings'] = localStorage[this.state.inpSettings[i].saveAs + 'Settings'] || JSON.stringify(this.state.inpSettings[i].defaults ?? {})
			this.state.settings[this.state.inpSettings[i].saveAs] = JSON.parse(localStorage[this.state.inpSettings[i].saveAs + 'Settings']);

			for (let key in this.state.settings[this.state.inpSettings[i].saveAs]) {
				this.setVar(this.state.inpSettings[i].saveAs, key, this.state.settings[this.state.inpSettings[i].saveAs][key])
			}
		}

		// D E B U G
		// @ts-ignore
		window.getVar = this.getVar;
	}
	setVarFactory = (what) => {
		return (key, value) => {
			return this.setVar(what, key, value)
		}
	}
	setVar = (what, key,value) => {
		if (!this.state.settings[what]) {
			this.setState({
				settings: {
					[what]: {
						[key]: value
					}
				}
			})
		} else {
			// eslint-disable-next-line react/no-direct-mutation-state
			this.state.settings[what][key] = value;
		}
		document.documentElement.style.setProperty("--" + key, value);
		localStorage[what+"Settings"] = JSON.stringify(this.state.settings[what]);
	}
	getVarFactory = (which) => {
		let what = which;
		return (key) => {
			return this.getVar(what,key)
		}
	}
	getVar = (which,key) => {
		let x = this.state.settings[which]?.[key] ?? 
		getComputedStyle(document.documentElement).getPropertyValue("--"+key);
		x = (x + "").trim();
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
							g={this.getVarFactory(inpSettings[i].saveAs)}
							changeWith={this.setVarFactory(inpSettings[i].saveAs)}
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