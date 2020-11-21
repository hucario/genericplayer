import React from 'react';
// import InputColor from 'react-input-color';

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
			<SettingsItem
				label="Background color"
			>
					<input
						type="color" 
						defaultValue={
							this.state.getVar('background')
						}
						onChange={(e) => {
							this.state.setVar('background', e.target.value)
						}}
					/>
			</SettingsItem>
			<SettingsItem
				label="Background color (floating)"
			>
				<input
					type="color"
					defaultValue={
						this.state.getVar('background-floating')
					}
					onChange={
						(e) => {
							this.state.setVar('background-floating', e.target.value)
						}
					}
				/>
			</SettingsItem>
			<SettingsItem
				label="Background color (float: 2)"
			>
				<input
					type="color"
					defaultValue={
						this.state.getVar('background-floating-higher')
					}
					onChange={
						(e) => {
							this.state.setVar('background-floating-higher', e.target.value);
						}
					}
				/>
			</SettingsItem>
			<SettingsItem
				label="Text color"
			>
				<input
					type="color"
					defaultValue={
						this.state.getVar('text-color')
					}
					onChange={
						(e) => {
							this.state.setVar('text-color', e.target.value);
						}
					}
				/>
			</SettingsItem>
			<SettingsItem
				label="Accent color"
			>
				<input
					type="color"
					defaultValue={
						this.state.getVar('accent-color')
					}
					onChange={
						(e) => {
							this.state.setVar('accent-color', e.target.value);
						}
					}
				/>
			</SettingsItem>
			<SettingsItem
				label="Height"
				label-secondary="Due to limitations placed by Chrome, the max height is 580px."
			>
				<input
					type="range"
					min="100"
					max="580"
					defaultValue={
						this.state.getVar('height')
					}
					onChange={
						(e) => {
							this.state.setVar('height', e.target.value);
						}
					}
				/>
			</SettingsItem>
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