import React, { Component } from "react";
import moment from "moment";
import { FormRow } from "../components/FormRow";
import TextField from "material-ui/TextField";
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import PictureUploader from "../components/PictureUploader";
import PicturePreview from "../components/PicturePreview";
import ArticleDetailsActions from "../components/ArticleDetailsActions";

const style = {
	margin: '-24px 0px'
}

const customDateStyle = {
	display: 'inline-block',
	cursor: 'none',
	height: '48px',
	lineHeight: '48px'
}

export default class ArticleDetails extends Component {
	render() {
		return (
			<div>
				<h1>Article Details</h1>
				<FormRow label="Author name">
					<TextField hintText="Author name" />
				</FormRow>
				<FormRow label="Title">
					<TextField hintText="Title" />
				</FormRow>
				<FormRow label="Content">
					<TextField 
						multiLine={true}
						hintText="Content"
						rows={1}
						rowsMax={6}	
					/>
				</FormRow>
				<FormRow label="License">
					<SelectField floatingLabelText="License" style={style}>
						<MenuItem key={1} value={1} primaryText="All Rights Reserved" />
						<MenuItem key={2} value={2} primaryText="Some Rights Reserved" />
						<MenuItem key={3} value={3} primaryText="No Rights Reserved" />
					</SelectField>
				</FormRow>
				<FormRow label="Publishing Date">
					<span style={customDateStyle} >
						{moment().format('MMMM Do YYYY')}
					</span>
				</FormRow>
				<FormRow label="Picture">
					<PictureUploader />
				</FormRow>
				<FormRow>
					<PicturePreview />
				</FormRow>
				<FormRow>
					<ArticleDetailsActions />
				</FormRow>
			</div>
		);
	}
}