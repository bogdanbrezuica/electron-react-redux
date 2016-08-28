import React, { Component } from "react";
import { connect } from "react-redux";
import ListHeader from "../components/ListHeader";
import ArticleCard from "../components/ArticleCard";
import { deleteArticle } from "../actions/article";

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
							{...article} 
							image={article.image.small.data} 
						/> 
					)}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		articles: [...state.articles]
	}
}

export default connect(mapStateToProps)(ArticleList);