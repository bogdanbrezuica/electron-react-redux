import React, { Component } from "react";
import { connect } from "react-redux";
import { push as routerPush } from "react-router-redux";
import moment from "moment";
import { bindActionCreators } from "redux";
import FormRow from "../components/FormRow";
import TextInput from "../components/TextInput";
import SelectInput from "../components/SelectInput";
import PictureUploader from "../components/PictureUploader";
import PicturePreview from "../components/PicturePreview";
import ArticleDetailsActions from "../components/ArticleDetailsActions";
import * as articleActions from '../actions/article';
import { findWhere } from "underscore";
import { FormError } from "../constants/Errors";
import { hasIllegalCharacters } from "../utils/Utils"

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
			name: props.name || '',
			title: props.title || '',
			content: props.content || '',
			license: props.license || null,
			image: props.image || '',
			date: props.date || this.getCurrentDate()
		}
	}

	getCurrentDate() {
		return moment().format('MMMM Do YYYY');
	}

	onNameChange(name) {
		this.setState({ name, nameError: undefined });
	}

	onTitleChange(title) {
		this.setState({ title, titleError: undefined });
	}

	onContentChange(content) {
		this.setState({ content, contentError: undefined });
	}

	onLicenseChange(license) {
		console.log(license);
		this.setState({ license, licenseError: undefined });
	}

	onImageChange(url) {
		this.setState({ image: url });
	}

	onSubmit() {
		if (!this.isFormValid()) {
			return;
		}
		const { generateImagesAndSave, params, dispatch } = this.props; 
		const { name, title, content, license, date, image } = this.state;
		const data = { name, title, content, license, date, image };
		generateImagesAndSave(params.id, data);
		dispatch(routerPush('/'));
	}

	isFormValid() {
		let {name, title, content, license} = this.state;
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
		console.log(state.license);
		return (
			<div>
				<h1>Article Details</h1>
				<form>
					<FormRow label="Author name">
						<TextInput hintText="Author name" errorText={state.nameError} value={state.name} onChange={this.onNameChange} />
					</FormRow>
					<FormRow label="Title">
						<TextInput hintText="Title" errorText={state.titleError} value={state.title} onChange={this.onTitleChange} />
					</FormRow>
					<FormRow label="Content">
						<TextInput
							multiLine={true}
							hintText="Content"
							rows={1}
							rowsMax={6}
							errorText={state.contentError}
							value={state.content}
							onChange={this.onContentChange}
						/>
					</FormRow>
					<FormRow label="License">
						<SelectInput 
							floatingLabelText="License"
							errorText={state.licenseError} 
							value={state.license}
							onChange={this.onLicenseChange}
						/>
					</FormRow>
					<FormRow label="Publishing Date">
						<span style={customDateStyle}> {state.date} </span>
					</FormRow>
					<FormRow label="Picture">
						<PictureUploader onChange={this.onImageChange} />
					</FormRow>
					<FormRow>
						<PicturePreview url={state.image}/>
					</FormRow>
					<FormRow>
						<ArticleDetailsActions isInvalid={this.isInvalid()} onSubmit={this.onSubmit}/>
					</FormRow>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	const { id } = ownProps.params;
	if (id === 'new') {
		return {};
	}
	const article = getArticleById(state.articles, id);
	if (!article) {
		return {};	
	}

	const { name, title, content, license, date, image} = article;
	const url = image && image.large ? image.large.data : '';
	return {
		name, title, content, license, date, image: url
	}
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators(articleActions, dispatch),
		dispatch
	};
}

function getArticleById(articles, id) {
	return findWhere(articles, {id});
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetails);