import React from 'react';
// import InputColor from 'react-input-color';
import ColorPicker from './colorpicker.js'
import Switch from 'react-switch';

export default class SettingsItem extends React.Component {
	state = {

	}
	constructor(props) {
		super(props);
		this.state.value = this.props.g(this.props.toChange).replace(/\D/g, "")
	}
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
					{
						this.props.type === "px" &&
							(<><input
								type="number"
								min={this.props.min}
								max={this.props.max}
								value={
									this.state.value
								}
								onChange={
									(e) => {
										this.setState({
											value: e.target.value
										})
										if (!this.props.changeWith) {
											return;
										}
										if (this.props.transformFunc) {
											this.props.changeWith(this.props.toChange,
												this.props.transformFunc(e.target.value))
										} else {
											this.props.changeWith(this.props.toChange, e.target.value + 'px');
										}
									}
								}
							/>
							<span
								className="measurement"
							>px</span></>)
					}
					{
						this.props.type === "toggle" &&
						<Switch 
							onChange={(e) => {
								this.setState({
									value: e
								})
								if (this.props.transformFunc) {
									this.props.changeWith(this.props.toChange,
										this.props.transformFunc(e))
								} else {
									this.props.changeWith(this.props.toChange, e + 'px');
								}
							}}
							checked={this.state.value}
						/>
					}
					{this.props.children}
				</div>
			</li>
		)
	}
}