import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as articleActions from '../actions/articleActions';
import { findWhere } from "underscore";
import ArticleForm from "../components/ArticleForm";

class ArticleDetails extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(article) {
		const { generateImagesAndSave, params } = this.props; 
		generateImagesAndSave(params.id, article);
	}

	render() {
		return (
			<div>
				<h1>Article Details</h1>
				<ArticleForm 
					article={this.props.article}
					onSubmit={this.onSubmit}				
				/>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	const { id } = ownProps.params;
	let stateArticle = getArticleById(state.articles, id);
	if (!stateArticle) {
		return { article: {}};
	}
	const { image } = stateArticle.image;
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