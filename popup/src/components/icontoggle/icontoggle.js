import React from 'react';
// eslint doesn't know how to parse css modules :pensive:
// @ts-expect-error
import styles from './icontoggle.module.css'

export default class IconToggle extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			icon: props.icon || 'bx-list-ul',
			onToggle: props.onToggle || function(){},
			value: props.checked || false
		}
	}
	onToggle = (e) => {
		this.state.onToggle(!this.state.value)
		this.setState({
			value: !this.state.value
		})
	}
	render() {
		return <input 
			type="checkbox" 
			className={styles.icontoggle + " bx bx-list-ul"}
			onChange={this.onToggle}
			checked={this.state.value}
			aria-checked={
				this.state.value
			}
		/>
	}
}