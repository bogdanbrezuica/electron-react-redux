import { any } from 'underscore';

export function hasIllegalCharacters(str) {
	const illegalCharacters = ['/', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '\\'];
	return any(illegalCharacters, char => str.indexOf(char) !== -1);
}

export function resizeImage(img, width) {
	const ratio = img.width / width;
	let canvas = document.createElement('canvas');

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