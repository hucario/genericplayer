import React from 'react';

export class Popup extends React.Component {
	state = {}
	/** @type {Object[]} */
	settings = [
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
				{
					label: 'Test toggle',
					type: 'toggle',
				}
			]
		}
	]
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