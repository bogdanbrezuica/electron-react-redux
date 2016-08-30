import ActionType from '../constants/ActionType';

export function deleteArticle(id) {
	return {
		type: ActionType.DELETE_ARTICLE,
		id
	}
}

export function addArticle(payload) {
	return {
		type: ActionType.ADD_ARTICLE,
		payload
	}
}

export function editArticle(id, payload) {
	return {
		id,
		type: ActionType.EDIT_ARTICLE,
		payload
	};
}

export function generateImagesAndSave(id, payload) {
	return dispatch => {
		let newPayload = {
			id,
			name: payload.name,
			title: payload.title,
			content: payload.content,
			license: payload.license,
			date: payload.date,
			image: {}
		}
		let url = payload.url;
		if (!url) {
			if (id === 'new') {
				dispatch(addArticle(newPayload));
			} else {
				dispatch(editArticle(id, newPayload));
			}
			return;
		}
		let img = new Image();
		img.onload = () => {
			newPayload.image = {};
			newPayload.image.small = resizeImage(img, 100);
			newPayload.image.medium = resizeImage(img, 150);
			newPayload.image.large = resizeImage(img, 200);
			id === 'new' ? dispatch(addArticle(newPayload)): dispatch(editArticle(id, newPayload));
		};
		img.src = url;
	}
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