import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as articleActions from '../actions/articleActions';
import { findWhere } from "underscore";
import ArticleForm from "../components/ArticleForm";
import { push as routerPush } from "react-router-redux";
import { remote } from "electron";
const { dialog } = remote;

class ArticleDetails extends Component {
	constructor(props) {
		super(props);

		this.initialArticle = props.article;
		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
	}

	onSubmit(article) {
		const { saveArticle, params } = this.props; 
		saveArticle(params.id, article);
	}

	onCancel(title) {
		const message = 'Are you sure you want to cancel? All your changes will be lost';
		const answer = dialog.showMessageBox(null, {
			type: 'question',
			buttons: ['Yes', 'No'],
			message,
			title,
			noLink: true
		});
		if (answer === 0) {
			this.props.dispatch(routerPush('/'));
		}
	}

	render() {
		return (
			<div>
				<h1>Article Details</h1>
				<ArticleForm 
					article={this.props.article}
					onSubmit={this.onSubmit}
					onCancel={this.onCancel}				
				/>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	let { id } = ownProps.params;
	if (id !== 'new') {
		id = parseInt(id);
	}
	let stateArticle = getArticleById(state.articles, id);
	if (!stateArticle) {
		return { article: {}};
	}
	const { image } = stateArticle;
	const url = image && image.large ? image.large.data : '';

	return {
		article: {
			name: stateArticle.name,
			title: stateArticle.title,
			content: stateArticle.content,
			license: stateArticle.license,
			date: stateArticle.date,
			url
		}
	};
}

ArticleDetails.propTypes = {
	article: PropTypes.object.isRequired
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators(articleActions, dispatch),
		dispatch
	};
}

function getArticleById(articles, id) {
	return findWhere(articles, {id});
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetails);