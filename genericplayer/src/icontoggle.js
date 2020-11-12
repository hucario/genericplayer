import React from 'react';
import './icontoggle.css'

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
			className="icontoggle bx bx-list-ul"
			onClick={this.state.onToggle}
		/>
	}
}