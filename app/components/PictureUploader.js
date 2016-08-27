import React from "react";
import FlatButton from "material-ui/FlatButton";
import style from "./PictureUploader.css";

const PictureUploader = () => (
	<FlatButton label="Choose Picture">
		<input className={style.Input} type="file"/>
	</FlatButton>
);

export default PictureUploader;