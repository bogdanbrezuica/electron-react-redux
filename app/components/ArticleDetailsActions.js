import React from "react";
import { Link } from "react-router";
import RaisedButton from "material-ui/RaisedButton";
import style from "./ArticleDetailsActions.css";

const ArticleDetailsActions = ({onSubmit, isInvalid}) => (
	<div className={style.container}>
		<div className={style.Button}>
			<RaisedButton disabled={isInvalid} label="Save" primary={true} onClick={onSubmit}/>
		</div>
		<div className={style.Button}>
			<Link to="/">
				<RaisedButton label="Cancel" secondary={true}/>
			</Link>
		</div>
	</div>
);

export default ArticleDetailsActions;