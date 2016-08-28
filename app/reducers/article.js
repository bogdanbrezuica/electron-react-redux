import { ADD_ARTICLE, EDIT_ARTICLE, DELETE_ARTICLE } from "../actions/article";
import * as _ from "underscore";

export function article(state, action) {
	switch (action.type) {
		case ADD_ARTICLE:
			const id = _.uniqueId('art');
			console.log(id);
			return {
				id,
				...action.payload
			};
		case EDIT_ARTICLE:
			if (state.id === action.id) {
				console.log('save art. should re-render');
				return Object.assign({}, state, action.payload);
			}
			return state;
		default:
			return state;
	}
}

export function articles(state = [], action) {
	switch (action.type) {
		case ADD_ARTICLE:
			return [
				...state,
				article(undefined, action)
			];
		case DELETE_ARTICLE:
			const index = state.findIndex(art => art.id === action.id);
			return [
				...state.slice(0, index),
				...state.slice(index + 1)
			];
		case EDIT_ARTICLE:
			return state.map((art) => article(art, action));
		default:
			return state;
	}
}

