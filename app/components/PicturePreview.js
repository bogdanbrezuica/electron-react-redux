import React from "react";
import style from "./PicturePreview.css";

const PicturePreview = ({url}) => {
	let preview = url ?
		<img src={url} width="100px" alt="Picture"/> :
		<div className={style.EmptyPreview} >
			<span>No picture selected</span>
		</div>;
	return (
		<div className={style.Container}>
			{preview}
		</div>
	);
};

export default PicturePreview;