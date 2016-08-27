import React, { Component } from "react";
import TextField from "material-ui/TextField";

export default class TextInput extends Component {
	constructor(props) {
		super(props);

		this.onValueChange = this.onValueChange.bind(this);
	}

	onValueChange(e) {
		this.props.onChange(e.target.value);
	}

	render() {
		return (
			<TextField
				{...this.props}
				onChange={this.onValueChange}
			/>
		);
	}
}