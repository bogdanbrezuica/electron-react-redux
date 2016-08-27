import React from "react";
import FlatButton from "material-ui/FlatButton";
import style from "./ArticleDetailsActions.css";

const ArticleDetailsActions = () => (
	<div className={style.container}>
		<div className={style.Button}>
			<FlatButton backgroundColor="lightgray" label="Save" primary={true}/>
		</div>
		<div className={style.Button}>
			<FlatButton backgroundColor="lightgray" label="Reset" secondary={true}/>
		</div>
	</div>
);

export default ArticleDetailsActions;