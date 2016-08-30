import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import style from './ArticleDetailsActions.css';

const ArticleDetailsActions = ({ onSubmit, onCancel, isInvalid }) => (
	<div className={style.container}>
		<div className={style.Button}>
			<RaisedButton disabled={isInvalid} label="Save" primary={true} onClick={onSubmit} />
		</div>
		<div className={style.Button}>
			<RaisedButton label="Cancel" secondary={true} onClick={onCancel} />
		</div>
	</div>
);

ArticleDetailsActions.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	isInvalid: PropTypes.bool
};

export default ArticleDetailsActions;