import React, { PropTypes } from 'react';
import style from './FormRow.css';

const FormRow = ({ label, children }) => (
	<div className={style.FieldRow}>
		<label className={style.FieldLabel} >
			{label}
		</label>
		{children}
	</div>
);

FormRow.propTypes = {
	label: PropTypes.string,
	children: PropTypes.element
};

export default FormRow;