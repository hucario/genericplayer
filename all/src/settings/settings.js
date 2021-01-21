import React from 'react';
import Helmet from 'react-helmet';
import SettingsItem from './components/settingsitem.js';

import platformSpecific from '../browser.js'


let yeah = platformSpecific.extension.getBackgroundPage().settings;

export default class SettingsApp extends React.Component {
	settingsByRawName = {}
	constructor(props) {
		super(props);


		this.state = {
			colorStandardizerCanvas: document.createElement('canvas').getContext("2d"),
			settings: {}
		}

		this.state.inpSettings = yeah.getSettingsPages();

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
			if (!inpSettings[i].sections ||
				!inpSettings[i].showReq) {
				continue;
			}

			if (inpSettings[i].showReq instanceof Boolean) {
				if (!inpSettings[i].showReq) {
					continue;
				}
			}
			if (inpSettings[i].showReq instanceof Array) {
				if (!inpSettings[i].showReq[2]) {
					continue;
				}
				if (!yeah) {
					continue;
				}
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
			<Helmet><title>GenericPlayer Settings</title><link href="/settings.css" rel="stylesheet" type="text/css" /></Helmet>
			{segs}
		</>
			)
	}
};
