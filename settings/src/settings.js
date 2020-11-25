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
			colorStandardizerCanvas: document.createElement('canvas').getContext("2d")
		}
		// D E B U G
		// @ts-ignore
		window.getVar = this.getVar;
		for (let key in localStorage) {
			document.documentElement.style.setProperty('--'+key, localStorage[key]);
		}
	}
	setVar = (key,value) => {
		localStorage[key] = value;
		document.documentElement.style.setProperty("--" + key, value);
	}
	getVar = (key) => {
		let x = localStorage[key] || 
		getComputedStyle(document.documentElement).getPropertyValue("--"+key);
		x = (x + "").trim();
		if (typeof x === 'string') {
			if (this.standardize_color(x) !== x) {
				return this.standardize_color(x);
			} else if (/^#([0-9A-F]{3}){1,2}$/i.test(x)) {
				return x;
			}
		} else {

		}
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
		let inpSettings = [
			new Popup().settings,
			this.state.activeExtension.settingsPage
		]
		let segs = []
		let count = 0;
		for (let i = 0; i < inpSettings.length; i++) {
			for (let f = 0; f < inpSettings[i].length; f++) {
				let theseFields = inpSettings[i][f].fields,
					localSegments = []

				segs.push(
					<h2 
						key={count++}
					>
						{inpSettings[i][f].title}
					</h2>
				)
				if (!inpSettings[i][f].fields) {
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
							g={this.getVar}
							changeWith={this.setVar}
							key={count++}
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