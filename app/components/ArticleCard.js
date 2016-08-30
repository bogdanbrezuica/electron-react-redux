import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { Card, CardHeader, CardTitle, CardActions, CardText, CardMedia } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import LicenseType from "../constants/LicenseType";
import style from "./ArticleCard.css";

export default class ArticleCard extends Component {
	constructor(props) {
		super(props);

		this.onDelete = this.onDelete.bind(this); 
	}
	
	onDelete() {
		const { article, onDelete } = this.props;
		onDelete(article.id);
	}

	render() {
		const { article } = this.props;
		const path = `/article/${article.id}`;
		return (
			<Card style={cardStyle}>
				<CardHeader 
					title={article.title}
					subtitle={article.name}
					actAsExpander={true}
					showExpandableButton={true}
				/>
				<CardText>
					<div className={style.textRow}>Published date: <span>{article.date}</span></div>
					<div className={style.textRow}>License: <span>{LicenseType[article.license-1]}</span></div>
				</CardText>
				{
					article.url &&
					<CardMedia expandable={true} style={cardMediaStyle}>
						<img src={article.url} alt='Picture'/>
					</CardMedia>
				}
				<CardText expandable={true}>
					<div>{article.content}</div>
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

ArticleCard.propTypes = {
	article: PropTypes.object.isRequired,
	onDelete: PropTypes.func.isRequired
}

const cardStyle = {
	width: '300px',
	margin: '30px',
	display: 'inline-block',
	verticalAlign: 'top'
}

const cardMediaStyle = {
	maxWidth: '200px',
	marginLeft: 'auto',
	marginRight: 'auto'
}