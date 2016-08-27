import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { bindActionCreators } from "redux";
import FormRow from "../components/FormRow";
import TextInput from "../components/TextInput";
import SelectInput from "../components/SelectInput";
import PictureUploader from "../components/PictureUploader";
import PicturePreview from "../components/PicturePreview";
import ArticleDetailsActions from "../components/ArticleDetailsActions";
import * as articleActions from '../actions/article';

const customDateStyle = {
	display: 'inline-block',
	height: '48px',
	lineHeight: '48px',
}

class ArticleDetails extends Component {
	constructor(props) {
		super(props);

		this.onNameChange = this.onNameChange.bind(this);
		this.onTitleChange = this.onTitleChange.bind(this);
		this.onContentChange = this.onContentChange.bind(this);
		this.onLicenseChange = this.onLicenseChange.bind(this);
		this.onImageChange = this.onImageChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			...props,
			date: props.date || this.getCurrentDate()
		}
	}

	getCurrentDate() {
		return moment().format('MMMM Do YYYY');
	}

	onNameChange(name) {
		this.setState({ name });
	}

	onTitleChange(title) {
		this.setState({ title });
	}

	onContentChange(content) {
		this.setState({ content });
	}

	onLicenseChange(license) {
		this.setState({ license });
	}

	onImageChange(url) {
		this.setState({
			image: url
		});
	}

	onSubmit() {
		const { generateImagesAndSave } = this.props; 
		const { name, title, content, license, date, image } = this.state;
		const data = { name, title, content, license, date, image };
		generateImagesAndSave(data);
	}

	render() {
		const {name, title, content, license, date, image} = this.state;

		return (
			<div>
				<h1>Article Details</h1>
				<form>
					<FormRow label="Author name">
						<TextInput hintText="Author name" value={name} onChange={this.onNameChange} />
					</FormRow>
					<FormRow label="Title">
						<TextInput hintText="Title" value={title} onChange={this.onTitleChange} />
					</FormRow>
					<FormRow label="Content">
						<TextInput
							multiLine={true}
							hintText="Content"
							rows={1}
							rowsMax={6}
							value={content}
							onChange={this.onContentChange}
						/>
					</FormRow>
					<FormRow label="License">
						<SelectInput 
							floatingLabelText="License" 
							value={license} 
							onChange={this.onLicenseChange}
						/>
					</FormRow>
					<FormRow label="Publishing Date">
						<span style={customDateStyle}> {date} </span>
					</FormRow>
					<FormRow label="Picture">
						<PictureUploader onChange={this.onImageChange} />
					</FormRow>
					<FormRow>
						<PicturePreview url={image}/>
					</FormRow>
					<FormRow>
						<ArticleDetailsActions onSubmit={this.onSubmit}/>
					</FormRow>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const {name, title, content, license, date, image} = state.article;
	const url = image.small.data;
	return {
		name, title, content, license, date, image: url
	}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(articleActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetails);