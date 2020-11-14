import React from 'react';
// eslint doesn't know how to parse css modules :pensive:
// @ts-expect-error
import styles from './icontoggle.module.css'

export default class IconToggle extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			icon: this.props.icon || 'bx-list-ul',
			onToggle: this.props.onToggle || function(){}
		}
	}
	render() {
		return <input 
			type="checkbox" 
			className={styles.icontoggle + " bx bx-list-ul"}
			onClick={this.state.onToggle}
		/>
	}
}