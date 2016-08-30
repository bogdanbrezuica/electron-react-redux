import React, { Component, PropTypes } from 'react';
import { remote } from 'electron';
import RaisedButton from 'material-ui/RaisedButton';

const { dialog } = remote;

export default class PictureUploader extends Component {

	constructor(props) {
		super(props);

		this.selectFile = this.selectFile.bind(this);
	}

	selectFile() {
		const dialogOptions = {
			filters: [
				{ name: 'Images', extensions: ['png', 'jpg', 'bmp'] }
			],
			properties: ['openFile']
		};

		const filesPath = dialog.showOpenDialog(dialogOptions);
		if (filesPath) {
			this.createUrl(filesPath[0]);
		}
	}

	createUrl(filePath) {
		const { onChange } = this.props;
		let xhr = new XMLHttpRequest(),
			blob;

		xhr.open('GET', filePath, true);
		xhr.responseType = 'blob';

		xhr.addEventListener('load', () => {
			if (xhr.status === 200) {
				blob = xhr.response;

				const reader = new FileReader();
				reader.onloadend = () => {
					onChange(reader.result);
				};

				reader.readAsDataURL(blob);
			}
		}, false);

		xhr.send();
	}

	render() {
		return (
			<RaisedButton label="Choose Picture" onClick={this.selectFile} />
		);
	}
}

PictureUploader.propTypes = {
	onChange: PropTypes.func.isRequired
};