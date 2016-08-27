export const SAVE_ARTICLE = 'SAVE_ARTICLE';

export function saveArticle(data) {
	console.log('save art');
	return {
		type: SAVE_ARTICLE,
		data
	};
}

export function generateImagesAndSave(data) {
	console.log('generate and save');
	return dispatch => {
		let url = data.image;
		let img = new Image();
		img.onload = () => {
			data.image = {};
			data.image.small = resizeImage(img, 100);
			data.image.medium = resizeImage(img, 150);
			data.image.large = resizeImage(img, 200);

			dispatch(saveArticle(data));
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