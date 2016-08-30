import React from "react";
import style from "./Overlay.css";

function onClick(e) {
	e.preventDefault();
	e.stopPropagation();
}

export default () => (
	<div className={style.Overlay} onClick={onClick}/>
);