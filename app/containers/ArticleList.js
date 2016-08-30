import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import ListHeader from "../components/ListHeader";
import ArticleCard from "../components/ArticleCard";
import Overlay from "../components/Overlay";
import { deleteArticleWithId } from "../actions/articleActions";
import { findWhere } from "underscore";
import { remote } from "electron";
const { dialog } = remote;

class ArticleList extends Component {
	constructor(props) {
		super(props);

		this.onDelete = this.onDelete.bind(this);
	}

	onDelete(id) {
		const { articles, dispatch } = this.props;
		const article = findWhere(articles, {id});
		const message = `Are you sure you want to delete article ${article.title}?`;
		const answer = dialog.showMessageBox(null, {
			type: 'question',
			buttons: ['Confirm', 'Cancel'],
			title: article.title,
			message,
			noLink: true
		});
		if (answer === 0) {
			dispatch(deleteArticleWithId(id));
		}
	}

	render() {
		const { articles } = this.props;

		return (
			<div>
				<ListHeader />
				<div>
					{articles.map((article) => 
						<ArticleCard 
							key={article.id} 
							onDelete={this.onDelete} 
							article={article}
						/>
					)}
				</div>
				{ this.props.fetching && <Overlay/>}
			</div>
		);
	}
}

function mapStateToProps(state) {
	let articles = state.articles.map(art => {
		if (!art.image) {
			return art;
		}
		return {
			id: art.id,
			name: art.name,
			title: art.title,
			content: art.content,
			license: art.license,
			date: art.date,
			url: art.image.large && art.image.large.data
		};
	});

	return {
		articles,
		fetching: state.fetchingArticles
	};
}

ArticleList.propTypes = {
	articles: PropTypes.arrayOf(React.PropTypes.object).isRequired,
	fetching: PropTypes.bool
}

export default connect(mapStateToProps)(ArticleList);