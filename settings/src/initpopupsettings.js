import React from 'react';
// import InputColor from 'react-input-color';
import ColorPicker from './components/colorpicker.js'

class SettingsItem extends React.Component {
	render() {
		return (
			<li>
				<div className="inner">
					<div className="labelWrapper">
						<div className="label-primary">
							{this.props.label || ""}
						</div>
						{this.props['label-secondary'] &&
							<span
								className="label-secondary"
							>
								{this.props['label-secondary']}
							</span>
						}
					</div>
					{
						this.props.type === "color" && 
						this.props.toChange &&
						<ColorPicker
							defaultValue={
								this.props.g(this.props.toChange)
							}
							onChange={
								(e) => {
									if (!this.props.changeWith) {
										return;
									}
									if (this.props.transformFunc) {
										this.props.changeWith(this.props.toChange,
											this.props.transformFunc(e.target.value))
									} else {
										this.props.changeWith(this.props.toChange, e.target.value);
									}
								}
							}
						/>
					}
					{this.props.children}
				</div>
			</li>
		)
	}
}

export class PopupSettings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			setVar: this.props.setVar || function(){},
			getVar: this.props.getVar || function(){}
		}
	}
	setCSSVar = (key, value) => {
		document.documentElement.style.setProperty("--" + key, value);
	}
	render() {
		return (
			<>
			<h2>Appearance</h2>
			<ul>
			<SettingsItem
				label="Background color"
				label-secondary="Color of the background of the player."
				type="color"
				toChange="background"
				changeWith={this.state.setVar}
				g={this.state.getVar}
			/>
			<SettingsItem
				label="Secondary background color"
				label-secondary="For inner components."
				type="color"
				toChange="background-floating"
				changeWith={this.state.setVar}
				g={this.state.getVar}
			/>
			<SettingsItem
				label="Tertiary background color"
				label-secondary="For components inside components."
				type="color"
				toChange="background-floating-higher"
				changeWith={this.state.setVar}
				g={this.state.getVar}
			/>
			<SettingsItem
				label="Accent color"
				label-secondary="The spice of life. Also the color of the seek and volume bar, among other things."
				type="color"
				toChange="accent-color"
				changeWith={this.state.setVar}
				g={this.state.getVar}
			/>
			<SettingsItem
				label="Active icon color"
				label-secondary="Shows when a button is active, e.g. the like button on a liked song"
				type="color"
				toChange="active-icon-color"
				changeWith={this.state.setVar}
				g={this.state.getVar}
			/>
			<SettingsItem
				label="Hint icon color"
				label-secondary="Shows when a button is being hovered on"
				type="color"
				toChange="hint-icon-color"
				changeWith={this.state.setVar}
				g={this.state.getVar}
			/>
			<SettingsItem
				label="Text color"
				label-secondary="For normal text."
				type="color"
				toChange="text-color"
				changeWith={this.state.setVar}
				g={this.state.getVar}
			/>
			<SettingsItem
				label="Muted text color"
				label-secondary="For less important text."
				type="color"
				toChange="text-muted"
				changeWith={this.state.setVar}
				g={this.state.getVar}
			/>
			<SettingsItem
				label="Height"
				label-secondary="Due to limitations placed by Chrome, the max height is 580px."
			>
				<input
					type="number"
					min="100"
					max="580"
					defaultValue={
						this.state.getVar('height').substring(0,this.state.getVar('height').length-2)
					}
					onChange={
						(e) => {
							this.state.setVar('height', e.target.value+'px');
						}
					}
				/>
			</SettingsItem>
			<SettingsItem
				label="Width"
				label-secondary="You probably shouldn't go under 300px"
			>
				<input
					type="number"
					min="100"
					max="580"
					defaultValue={
						this.state.getVar('width').substring(0,this.state.getVar('width').length-2)
					}
					onChange={
						(e) => {
							this.state.setVar('width', e.target.value+'px');
						}
					}
				/>
			</SettingsItem>
			</ul>
		</>)
	}
}

export class Popup extends React.Component {
	state = {}
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