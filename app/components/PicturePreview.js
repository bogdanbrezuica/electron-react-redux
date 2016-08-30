import React, { PropTypes } from 'react';
import style from './PicturePreview.css';

const PicturePreview = ({ url }) => {
	let preview = url ?
		<img src={url} className={style.Image} role="presentation" /> :
		<div className={style.EmptyPreview} >
			<span>No picture selected</span>
		</div>;
	return (
		<div className={style.Container}>
			{preview}
		</div>
	);
};

PicturePreview.propTypes = {
	url: PropTypes.string
};

export default PicturePreview;