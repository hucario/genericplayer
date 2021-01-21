import React from 'react';

/* polyfilling during dev because this sure ain't an extension yet */
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-use-before-define
var chrome = chrome || {
	extension: {
		getBackgroundPage: function() {
			return {
				getSettings: function() {
					return {

					}
				}
			}
		}
	}
}

export class Popup extends React.Component {
	state = {}
	setVar = (a,b) => {
		this.settings[a] = b;
	}
	getVar = (a) => {
		return this.settings[a];
	}
	settings = chrome.extension.getBackgroundPage().getSettings();
	/** @type {Object} */
	settingsPage = {
		title: 'Popup Settings',
		showReq: () => {
			return (true)
		},
		defaults: {
		},
		setVar: this.setVar,
		getVar: this.getVar,
		sections: [
			{
				title: 'Colors',
				fields: [
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
	}
	constructor(props) {
		super(props);
		this.state = {
			settings: {
			}
		}
	}
	render() {
		return (<></>)
	}
};