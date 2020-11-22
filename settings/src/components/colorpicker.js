import React from 'react';
// @ts-ignore
import Styles from './colorpicker.module.css';

export default class ColorPicker extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			onChange: this.props.onChange || function(){},
			value: this.props.defaultValue || '000000'
		}
	}
	onChange = (e) => {
		console.log(e);
		this.setState({
			value: e.target.value
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
					this.state.value.toUpperCase()	
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