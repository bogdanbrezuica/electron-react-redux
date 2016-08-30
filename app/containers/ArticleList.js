import React, { Component } from "react";
import { connect } from "react-redux";
import ListHeader from "../components/ListHeader";
import ArticleCard from "../components/ArticleCard";
import { deleteArticle } from "../actions/articleActions";

class ArticleList extends Component {
	constructor(props) {
		super(props);

		this.onDelete = this.onDelete.bind(this);
	}

	onDelete(id) {
		const { dispatch } = this.props;
		dispatch(deleteArticle(id));
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
			url: art.image.large.data
		};
	});

	return {
		articles
	};
}

export default connect(mapStateToProps)(ArticleList);