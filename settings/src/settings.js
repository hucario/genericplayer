import React from 'react';
import {SampleExtension} from './extensions/sampleextension.js'
import InputColor from 'react-input-color';

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
			activeExtension: chrome.extension.getBackgroundPage().getCurrentExtension()
		}
	}
	onChange = (e) => {
		document.documentElement.style.setProperty("--background", e.rgba);
	}
	render() {
		return (
		<React.Fragment>
			<h1>Main settings</h1>
			<h1>Theming</h1>
			<InputColor 
				initialValue="#000000"
				onChange={this.onChange}
				placement="below"
			/>

		</React.Fragment>
			)
	}
};