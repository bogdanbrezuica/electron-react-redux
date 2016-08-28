import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import { Link } from "react-router";

const ListHeader = () => (
	<div>
		<h1> Article list </h1>
		<Link to="/new">
			<RaisedButton label="Add new article" />
		</Link>
	</div>
);

export default ListHeader;