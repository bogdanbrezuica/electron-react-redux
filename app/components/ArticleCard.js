import React, { Component } from "react";
import { Link } from "react-router";
import { Card, CardHeader, CardTitle, CardActions, CardText, CardMedia } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import LicenseType from "../constants/LicenseType";
import style from "./ArticleCard.css";

const cardStyle={
	width: '300px',
	margin: '30px',
	display: 'inline-block'
}

export default class ArticleCard extends Component {
	constructor(props) {
		super(props);

		this.onDelete = this.onDelete.bind(this); 
	}
	
	onDelete() {
		const { id, onDelete } = this.props;
		onDelete(id);
	}

	render() {
		const { id, name, title, content, license, date, image, onDelete } = this.props;
		const path = `/${id}`;
		return (
			<Card style={cardStyle}>
				<CardHeader 
					title={title}
					subtitle={name}
					actAsExpander={true}
					showExpandableButton={true}
				/>
				<CardText>
					<div className={style.textRow}>Published date: <span>{date}</span></div>
					<div className={style.textRow}>License: <span>{LicenseType[license-1]}</span></div>
				</CardText>
				<CardActions>
					<Link to={path}>
						<RaisedButton label="Edit" />
					</Link>
					<RaisedButton onClick={this.onDelete} label="Delete">
					</RaisedButton>
				</CardActions>
			</Card>
		);
	}
}