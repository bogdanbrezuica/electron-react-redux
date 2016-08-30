import React, { Component, PropTypes } from "react";
import moment from "moment";
import TextInput from "./TextInput";
import FormRow from "./FormRow";
import SelectInput from "./SelectInput";
import PictureUploader from "./PictureUploader";
import PicturePreview from "./PicturePreview";
import ArticleDetailsActions from "./ArticleDetailsActions";
import { hasIllegalCharacters } from "../utils/Utils";
import { FormError } from "../constants/Errors";

export default class ArticleForm extends Component {
	constructor(props) {
		super(props);

		this.onTextChange = this.onTextChange.bind(this);
		this.onLicenseChange = this.onLicenseChange.bind(this);
		this.onImageChange = this.onImageChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);

		let { article } = props;
		this.state = {
			article: {
				name: article.name || '',
				title: article.title || '',
				content: article.content || '',
				license: article.license || null,
				url: article.url || '',
				date: article.date || this.getCurrentDate()
			}
		}
	}

	getCurrentDate() {
		return moment().format('MMMM Do YYYY');
	}

	onTextChange(event) {
		let { article } = this.state;
		article[event.target.name] = event.target.value,

		this.setState({
			article,
			[`${event.target.name}Error`]: undefined
		});
	}

	onLicenseChange(license) {
		let { article } = this.state;
		article.license = license;
		this.setState({ article, licenseError: undefined });
	}

	onImageChange(url) {
		let { article } = this.state;
		article.url = url;
		this.setState({ article });
	}

	onCancel() {
		this.props.onCancel(this.state.article.title);
	}

	onSubmit() {
		if (!this.isFormValid()) {
			return;
		}
		this.props.onSubmit(this.state.article);
	}

	isFormValid() {
		let {name, title, content, license} = this.state.article;
		let nameError, titleError, contentError, licenseError;

		if (!name) {
			nameError = FormError.nameEmpty;
		} else if (hasIllegalCharacters(name)) {
			nameError = FormError.nameIllegal;
		}

		if (!title) {
			titleError = FormError.titleEmpty;
		}
		
		if (!content) {
			contentError = FormError.contentEmpty;
		}
		
		if (license == null) {
			licenseError = FormError.licenseEmpty;
		}

		if (nameError || titleError || contentError || licenseError) {
			this.setState({
				nameError, titleError, contentError, licenseError
			});
			return false;
		}

		return true;
	}

	isInvalid() {
		const state = this.state;
		return !!(state.nameError || state.titleError || state.contentError || state.licenseError); 
	}

	render() {
		const state = this.state;
		const { article } = state;

		return (
			<form>
				<FormRow label="Author name">
					<TextInput 
						hintText="Author name" 
						name="name"
						errorText={state.nameError}
						value={article.name}
						onChange={this.onTextChange} 
					/>
				</FormRow>
				<FormRow label="Title">
					<TextInput 
						hintText="Title" 
						name="title" 
						errorText={state.titleError} 
						value={article.title} 
						onChange={this.onTextChange} 
					/>
				</FormRow>
				<FormRow label="Content">
					<TextInput
						multiLine={true}
						hintText="Content"
						name="content"
						rows={1}
						rowsMax={6}
						errorText={state.contentError}
						value={article.content}
						onChange={this.onTextChange}
					/>
				</FormRow>
				<FormRow label="License">
					<SelectInput 
						floatingLabelText="License"
						errorText={state.licenseError} 
						value={article.license}
						onChange={this.onLicenseChange}
					/>
				</FormRow>
				<FormRow label="Publishing Date">
					<span style={customDateStyle}> {article.date} </span>
				</FormRow>
				<FormRow label="Picture">
					<PictureUploader onChange={this.onImageChange} />
				</FormRow>
				<FormRow>
					<PicturePreview url={article.url}/>
				</FormRow>
				<FormRow>
					<ArticleDetailsActions 
						isInvalid={this.isInvalid()} 
						onSubmit={this.onSubmit}
						onCancel={this.onCancel}
					/>
				</FormRow>
			</form>
		);
	}
}

ArticleForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	article: PropTypes.object.isRequired
}

const customDateStyle = {
	display: 'inline-block',
	height: '48px',
	lineHeight: '48px',
}