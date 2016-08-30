import React, { Component } from "react";
import TextField from "material-ui/TextField";

export default (props) => (
	<TextField
		{...props}
		onChange={props.onChange}
	/>
);