import React from 'react';
// @ts-ignore
import Styles from './colorpicker.module.css';

export default class ColorPicker extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			onChange: this.props.onChange || function(){},
			value: (this.props.stdColor && this.props.stdColor(this.props.defaultValue || '#000')) || this.props.defaultValue,
		}
		if (this.props.defaultValue.includes('rgb')) {
			let x = this.props.defaultValue.replace('rgb(','').replace(')','').slice(',');
			this.state.nonstdValue = "#" + ((1 << 24) + (x[0] << 16) + (x[1] << 8) + x[2]).toString(16).slice(1)
		} else {
			this.state.nonstdValue = this.props.defaultValue || "#000"
		}

		// https://stackoverflow.com/a/5624139/11726576

	}
	onChange = (e) => {
		this.setState({
			value: e.target.value,
			nonstdValue: e.target.value
		})
		this.state.onChange(e);
	}
	render() {
		return (<div
			className={Styles.main}
		>
			<input
				className={
					Styles.manual
				}
				value={
					this.state.nonstdValue.toUpperCase()	
				}
				onChange={
					this.onChange
				}
			/>
			<div
				className={Styles.show}
				style={{
					backgroundColor: this.state.value
				}}
			>
				<input
					className={
						Styles.hiddenPicker
					}
					type="color"
					value={
						this.state.value
					}
					onChange={
						this.onChange
					}
				/>
			</div>
		</div>)
	}
}