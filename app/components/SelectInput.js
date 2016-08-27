import React, { Component } from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

const customStyle = {
	margin: '-24px 0px'
}

export default class SelectInput extends Component {
	constructor(props) {
		super(props);

		this.onValueChange = this.onValueChange.bind(this);
	}

	onValueChange(event, index, value) {
		this.props.onChange(value);
	}

	render() {
		return (
			<SelectField
				{...this.props}
				style={customStyle}
				onChange={this.onValueChange}
			>
				<MenuItem key={1} value={1} primaryText="All Rights Reserved" />
				<MenuItem key={2} value={2} primaryText="Some Rights Reserved" />
				<MenuItem key={3} value={3} primaryText="No Rights Reserved" />
			</SelectField>
		);
	}
}