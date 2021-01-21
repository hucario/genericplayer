import React from 'react';
import styles from './range.module.css';

export default class Range extends React.Component {
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
					onChange={this.props.onChange}
					value={this.props.value}
					onMouseDown={this.props.onMouseDown}
					onMouseUp={this.props.onMouseUp}
					title={this.props.title || ""}
					aria-label={
						this.props['aria-label']
					}
                />
            </div>
        );
	}
}