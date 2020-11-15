import React from 'react';
// @ts-expect-error
import styles from './range.module.css';

export default class Range extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			firstValue: this.props.value || 0,
			value: this.props.value || 0,
			inputEvent: this.props.inputEvent || function(){},
			onmousedown: this.props.onMouseDown || function(){},
			onmouseup: this.props.onMouseUp || function(){}
		}

		this.oninput = this.oninput.bind(this);
	}
	oninput(e) {
		this.setState({
			value: e.target.value
		})
		this.state.inputEvent(e.target.value)
	}
	render() {
		return (
            <div id={this.props.id} className={styles.wrapper}>
				<div 
					className={styles.previous} 
					style={{
						width: `${this.props.value / (0.01 * (this.props.max||100))}%`
					}}
				/>
                <input 
                    className={styles.control} 
                    type='range' 
                    min="0" 
					max={this.props.max || 100} 
					onInput={this.oninput}
					value={this.props.value}
					onMouseDown={this.state.onmousedown}
					onMouseUp={this.state.onmouseup}
					title={this.props.title || ""}
                />
            </div>
        );
	}
}