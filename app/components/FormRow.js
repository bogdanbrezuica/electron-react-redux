import React from "react";
import TextField from "material-ui/TextField";
import style from "./FormRow.css";

const FormRow = ({label, children}) => (
	<div className={style.FieldRow}>
		<label className={style.FieldLabel} >
			{label}
		</label>
		{children}
	</div>
);

export default FormRow;