import ActionType from "../constants/ActionType";
import { push as routerPush } from 'react-router-redux';
import * as db from "../api/db";

export function allArticles(articles) {
	return {
		type: ActionType.ALL_ARTICLES,
		payload: articles
	}
}

function deleteArticle(id) {
	return {
		type: ActionType.DELETE_ARTICLE,
		id
	}
}

function addArticle(payload) {
	return {
		type: ActionType.ADD_ARTICLE,
		payload
	}
}

function editArticle(id, payload) {
	return {
		id,
		type: ActionType.EDIT_ARTICLE,
		payload
	};
}

export function saveArticle(id, payload) {
	return dispatch => {
		let newPayload = {
			name: payload.name,
			title: payload.title,
			content: payload.content,
			license: payload.license,
			date: payload.date,
			image: {}
		}
		let url = payload.url;

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
	}
}		

function saveArticleInDb(id, newPayload, dispatch) {
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
			console.log(err);
		});
	};
}

function resizeImage(img, width) {
	console.log('resize image');
	const ratio = img.width / width;
	let canvas = document.createElement("canvas");
	
	canvas.width = img.width / ratio;
	canvas.height = img.height / ratio;
	
	const ctx = canvas.getContext('2d');
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

	const newUrl = canvas.toDataURL();
	return {
		width,
		height: canvas.height,
		data: newUrl
	};
}