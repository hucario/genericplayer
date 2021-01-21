import React from 'react';
// @ts-expect-error
import styles from './range.module.css';

export default class Range extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			firstValue: this.props.value || 0,
			value: this.props.value,
			inputEvent: this.props.inputEvent || function(){},
			onmousedown: this.props.onMouseDown || function(){},
			onmouseup: this.props.onMouseUp || function(){}
		}
		this.props.setValueCB && this.props.setValueCB(this.setValue)
	}
	setValue = (e) => {
		this.setState({
			value: e
		})
	}
	oninput = (e) => {
		this.setState({
			value: e.target.value
		})
		this.state.inputEvent(e.target.value)
	}
	onmouseup = (e) => {
		this.state.onmouseup(e.target.value);
	}
	onmousedown = (e) => {
		this.state.onmousedown(e.target.value)
	}
	render() {
		return (
            <div id={this.props.id} className={styles.wrapper}>
				<div 
					className={styles.previous} 
					style={{
						width: `${this.state.value / (0.01 * (this.props.max||100))}%`
					}}
				/>
                <input 
                    className={styles.control} 
                    type='range' 
                    min="0" 
					max={this.props.max || 100}  	
					onChange={this.oninput}
					value={this.state.value}
					onMouseDown={this.onmousedown}
					onMouseUp={this.onmouseup}
					title={this.props.title || ""}
					aria-label={
						this.props['aria-label']
					}
                />
            </div>
        );
	}
}