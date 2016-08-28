export const ADD_ARTICLE = 'ADD_ARTICLE';
export const EDIT_ARTICLE = 'EDIT_ARTICLE';
export const DELETE_ARTICLE = 'DELETE_ARTICLE';

export function deleteArticle(id) {
	return {
		type: DELETE_ARTICLE,
		id
	}
}

export function addArticle(payload) {
	return {
		type: ADD_ARTICLE,
		payload
	}
}

export function editArticle(id, payload) {
	return {
		id,
		type: EDIT_ARTICLE,
		payload
	};
}

export function generateImagesAndSave(id, data) {
	return dispatch => {
		let url = data.image;
		if (!url) {
			if (id === 'new') {
				dispatch(addArticle(data));
			} else {
				dispatch(editArticle(id, data));
			}
			return;
		}
		let img = new Image();
		img.onload = () => {
			data.image = {};
			data.image.small = resizeImage(img, 100);
			data.image.medium = resizeImage(img, 150);
			data.image.large = resizeImage(img, 200);
			id === 'new' ? dispatch(addArticle(data)): dispatch(editArticle(id, data));
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