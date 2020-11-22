import React from 'react';
import {SampleExtension} from './extensions/sampleextension.js'
import {
	PopupSettings
} from './initpopupsettings.js'


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

export default class SettingsApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeExtension: chrome.extension.getBackgroundPage().getCurrentExtension(),
			colorStandardizerCanvas: document.createElement('canvas').getContext("2d")
		}
		// D E B U G
		window.getVar = this.getVar;
	}
	setVar = (key,value) => {
		document.documentElement.style.setProperty("--" + key, value);
	}
	getVar = (key) => {
		let x = getComputedStyle(document.documentElement).getPropertyValue("--"+key);
		if (typeof x === 'string') {
			if (this.standardize_color(x) !== x) {
				return this.standardize_color(x);
			} else if (/^#([0-9A-F]{3}){1,2}$/i.test(x)) {
				return x.substring(1);
			}
		} else {
		}
		return getComputedStyle(document.documentElement).getPropertyValue("--"+key);
	}
	standardize_color = (str) => {
		if (
			str.includes('px') ||
			str.includes('em') ||
			str.includes('vh') ||
			str.includes('vw')			
		) {
			return str.trim();
		}
		var ctx = this.state.colorStandardizerCanvas;
		ctx.fillStyle = str;
		return ctx.fillStyle;
	}
	render() {
		return (
		<>
			<img 
				src="/logo512.png" 
				alt="GenericPlayer logo"
				className="toplogo"
			/>
			<PopupSettings 
				setVar={
					this.setVar
				}
				getVar={
					this.getVar
				}
			/>
		</>
			)
	}
};