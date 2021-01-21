import React from 'react';
import styles from './icontoggle.module.css'

export default class IconToggle extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			icon: props.icon ?? 'bx-list-ul',
			onToggle: props.onToggle || function(){},
			value: props.checked ?? false
		}
	}
	onToggle = (e) => {
		this.state.onToggle(e.target.value)
		this.setState({
			value: e.target.value
		})
	}
	render() {
		return <input 
			type="checkbox" 
			className={styles.icontoggle + " bx bx-list-ul"}
			onChange={this.onToggle}
			checked={this.props.value ?? this.state.value}
			aria-checked={
				this.state.value
			}
		/>
	}
}