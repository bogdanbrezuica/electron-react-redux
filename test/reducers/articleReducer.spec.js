import { expect } from 'chai';
import ActionType from '../../app/constants/ActionType';
import { articles, article } from '../../app/reducers/articleReducer';
import * as actions from '../../app/actions/articleActions';

describe('Articles reducer', () => {
	it('should compute new state on ALL_ARTICLES action', () => {
		const initialState = [];
		const initialArticles = [
			{ name: 'a', title: 'b' },
			{ name: 'x', title: 'y' }
		];
		const action = actions.allArticles(initialArticles);

		const newState = articles(initialState, action);

		expect(action.type).to.equal(ActionType.ALL_ARTICLES);
		expect(action.payload).to.deep.equal(initialArticles);
		expect(newState).to.deep.equal(initialArticles);
	});

	it('should compute new state on ADD_ARTICLE action', () => {
		const initialState = [
			{ name: 'a', title: 'a' }
		];
		const newArticle = { name: 'b', title: 'b' };
		const action = actions.addArticle(newArticle);
		const newState = articles(initialState, action);

		expect(action.type).to.equal(ActionType.ADD_ARTICLE);
		expect(action.payload).to.deep.equal(newArticle);
		expect(newState.length).to.equal(2);
		expect(newState[0]).to.deep.equal(initialState[0]);
		expect(newState[1]).to.deep.equal(newArticle);
	});

	it('should compute new state on EDIT_ARTICLE action', () => {
		const initialState = [
			{ id: 1, name: 'a', title: 'a' }
		];
		const newArticle = { id: 1, name: 'b', title: 'b' };
		const action = actions.editArticle(newArticle.id, newArticle);
		const newState = articles(initialState, action);

		expect(action.type).to.equal(ActionType.EDIT_ARTICLE);
		expect(action.payload).to.deep.equal(newArticle);
		expect(newState.length).to.equal(1);
		expect(newState[0]).to.deep.equal(newArticle);
	});

	it('should compute new state on DELETE_ARTICLE action', () => {
		const initialState = [
			{ id: 1, name: 'a', title: 'a' },
			{ id: 2, name: 'b', title: 'b' }
		];
		const action = actions.deleteArticle(1);
		const newState = articles(initialState, action);

		expect(action.type).to.equal(ActionType.DELETE_ARTICLE);
		expect(action.id).to.equal(1);
		expect(newState.length).to.equal(1);
		expect(newState[0]).to.deep.equal(initialState[1]);
	});
});

describe('Article reducer', () => {
	it('should compute new state on ADD_ARTICLE action', () => {
		const initialState = {};
		const newArticle = { name: 'b', title: 'b' };
		const action = actions.addArticle(newArticle);
		const newState = article(initialState, action);

		expect(newState).to.deep.equal(newArticle);
	});

	it('should compute new state on EDIT_ARTICLE action', () => {
		const initialState = { id: 1, name: 'a', title: 'a' };
		const newArticle = { id: 1, name: 'b', title: 'b' };
		const action = actions.editArticle(newArticle.id, newArticle);
		const newState = article(initialState, action);

		expect(action.type).to.equal(ActionType.EDIT_ARTICLE);
		expect(newState).to.deep.equal(newArticle);
	});
});