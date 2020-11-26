import React from 'react';
// import InputColor from 'react-input-color';
import ColorPicker from './colorpicker.js'
import Switch from 'react-switch';
import Select from 'react-select';

export default class SettingsItem extends React.Component {
	state = {

	}
	constructor(props) {
		super(props);
		if (this.props.type === "number" || this.props.type === "px") {
			this.state.value = this.props.g(this.props.toChange).replace(/\D/g, "")
		} else {
			this.state.value = this.props.g(this.props.toChange);
		}

		if (this.props.type === "color" && this.props.stdColor && this.props.stdColor(this.state.value) !== this.state.value) {
			this.state.value = this.props.stdColor(this.state.value);
		}
		if (this.props.type === "select") {
			for (let i = 0; i < this.props.options.length; i++) {
				if (this.props.options[i].value === this.state.value) {
					this.state.value = this.props.options[i];
					break;
				}
			}
		}
	}
	getColorVar = (a) => {
		return getComputedStyle(document.documentElement).getPropertyValue('--'+a).trim()
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
							stdColor={
								this.props.stdColor
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
										this.forceUpdate();
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
							className={
								this.state.value?'toggleChecked':'toggleUnchecked'
							}
							onChange={(e) => {
								this.setState({
									value: e
								})
								if (this.props.transformFunc) {
									this.props.changeWith(this.props.toChange,
										this.props.transformFunc(e))
								} else {
									this.props.changeWith(this.props.toChange, e);
								}
							}}
							checked={Boolean(this.state.value)}
							onColor="#FFF"
							offColor="#000"
						/>
					}
					{
						this.props.type === "select" &&
						<Select
							onChange={(e) => {
								this.setState({
									value: e
								})
								if (this.props.transformFunc) {
									this.props.changeWith(this.props.toChange,
										this.props.transformFunc(e))
								} else {
									this.props.changeWith(this.props.toChange, e.value);
								}
							}}
							options={
								this.props.options
							}
							value={
								this.state.value
							}
							styles={{
								option: (provided, state) => ({
										...provided,
										color: "var(--text-color)",
										background: (state.isFocused||state.isSelected)?
										"rgba(150,150,150,0.2)":"transparent",
										transition: "background 250ms"
									}),
								control: (provided) => ({
									...provided,
									color: "var(--text-color)",
									background: "var(--background-floating)",
									width: "15em"
								}),
								menu: (provided) => ({
									...provided,
									color: "var(--text-color)",
									background: "var(--background-floating)",
									overflow: "hidden"
								}),
								menuList: (provided) => ({
									...provided,
									color: "var(--text-color)"
								}),
								input: (provided) => ({
									...provided,
									color: "var(--text-color)"
								}),
								singleValue: (provided) => ({
									...provided,
									color: "var(--text-color)"
								})
							}}
							blurInputOnSelect={true}
						/>
					}
					{this.props.children}
				</div>
			</li>
		)
	}
}