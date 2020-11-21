import React from 'react';
import {SampleExtension} from './extensions/sampleextension.js'
import {
	PopupSettings
} from './initpopupsettings.js' 
// @ts-ignore
import Styles from './settings.module.css';


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
		}
	}
	setVar = (key,value) => {
		document.documentElement.style.setProperty("--" + key, value);
	}
	getVar = (key) => {
		return document.documentElement.style.getPropertyValue('--' + key)
	}
	render() {
		return (
		<React.Fragment>
			<img 
				src="/logo512.png" 
				alt="GenericPlayer logo"
				className={Styles.toplogo}
			/>
			<h1>Appearance</h1>
			<ul>
			<PopupSettings 
				setVar={
					this.setVar
				}
				getVar={
					this.getVar
				}
			/>
			</ul>
		</React.Fragment>
			)
	}
};