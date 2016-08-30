import { push as routerPush } from 'react-router-redux';
import ActionType from '../constants/ActionType';
import * as db from '../api/db';
import { resizeImage } from '../utils/Utils';

export function allArticles(articles) {
	return {
		type: ActionType.ALL_ARTICLES,
		payload: articles
	};
}

export function deleteArticle(id) {
	return {
		type: ActionType.DELETE_ARTICLE,
		id
	};
}

export function addArticle(payload) {
	return {
		type: ActionType.ADD_ARTICLE,
		payload
	};
}

export function editArticle(id, payload) {
	return {
		id,
		type: ActionType.EDIT_ARTICLE,
		payload
	};
}

export function saveArticle(id, payload) {
	return dispatch => {
		const newPayload = {
			name: payload.name,
			title: payload.title,
			content: payload.content,
			license: payload.license,
			date: payload.date,
			image: {}
		};
		const url = payload.url;

		if (id !== 'new') {
			newPayload.id = parseInt(id);
		}

		if (!url) {
			saveArticleInDb(id, newPayload, dispatch);
			return;
		}

		let img = new Image();
		img.onload = () => {
			newPayload.image = {};
			newPayload.image.small = resizeImage(img, 100);
			newPayload.image.medium = resizeImage(img, 150);
			newPayload.image.large = resizeImage(img, 200);

			saveArticleInDb(id, newPayload, dispatch);
		};
		img.src = url || '';
	};
}

export function saveArticleInDb(id, newPayload, dispatch) {
	db.saveArticle(newPayload).then(() => {
		if (id === 'new') {
			dispatch(addArticle(newPayload));
		} else {
			dispatch(editArticle(parseInt(id), newPayload));
		}
		dispatch(routerPush('/'));
	}).catch((err) => {
		console.error(err);
	});
}

export function deleteArticleWithId(id) {
	return dispatch => {
		db.deleteArticle(id).then(() => {
			dispatch(deleteArticle(id));
		}).catch((err) => {
			console.error(err);
		});
	};
}