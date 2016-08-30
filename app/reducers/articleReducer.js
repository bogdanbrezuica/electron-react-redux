import ActionType from "../constants/ActionType";
import * as _ from "underscore";

export function article(state = {}, action) {
	switch (action.type) {
		case ActionType.ADD_ARTICLE:
			const id = _.uniqueId('art');
			const newObject = {id, ...action.payload};
			
			return {
				id,
				...action.payload
			};
		case ActionType.EDIT_ARTICLE:
			if (state.id == action.id) {
				return Object.assign({}, state, action.payload);
			}
			return state;
		default:
			return state;
	}
}

export function articles(state = [], action) {
	switch (action.type) {
		case ActionType.ADD_ARTICLE:
			return [
				...state,
				article(undefined, action)
			];
		case ActionType.ALL_ARTICLES:
			return action.payload || state;
		case ActionType.DELETE_ARTICLE:
			const index = state.findIndex(art => art.id === action.id);
			return [
				...state.slice(0, index),
				...state.slice(index + 1)
			];
		case ActionType.EDIT_ARTICLE:
			return state.map((art) => article(art, action));
		default:
			return state;
	}
}