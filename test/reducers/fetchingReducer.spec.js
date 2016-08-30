import { expect } from 'chai';
import ActionType from '../../app/constants/ActionType';
import { fetchingArticles } from '../../app/reducers/fetchingReducer';
import fetchArticles from '../../app/actions/fetchingActions';
import { allArticles } from '../../app/actions/articleActions';

describe('Fetching reducer', () => {
	it('should compute new state on FETCH_ARTICLES action', () => {
		const initialState = false;

		const action = fetchArticles();
		const newState = fetchingArticles(initialState, action);

		expect(action.type).to.equal(ActionType.FETCH_ARTICLES);
		expect(newState).to.be.true;
	});

	it('should compute new state on ALL_ARTICLES action', () => {
		const initialState = true;

		const action = allArticles([]);
		const newState = fetchingArticles(initialState, action);

		expect(action.type).to.equal(ActionType.ALL_ARTICLES);
		expect(newState).to.be.false;
	});
});