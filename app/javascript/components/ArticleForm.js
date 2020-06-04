import React from 'react';
import EventNotFound from './ArticleNotFound';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isEmptyObject, validateArticle } from '../helpers/helpers';
import { addArticle, updateArticle } from '../actions/ArticleActions';
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
	articles: state.articles,
    };
};

class ArticleForm extends React.Component {
    constructor(props) {
	super(props);
	
	this.state = {
	    article: props.location.state.article,
	    errors: {},
	};

	this.handleSubmit = this.handleSubmit.bind(this);
	this.handleInputChange = this.handleInputChange.bind(this);
	this.addArticle = this.addArticle.bind(this);
    }

    addArticle(newArticle) {
	this.props.dispatch(addArticle(newArticle));
	const { history } =this.props;
	history.push(`/articles`);
    }

    updateArticle(updatedArticle) {
	this.props.dispatch(updateArticle(updatedArticle));
	const { history } = this.props;
	history.push(`/articles/${updatedArticle.id}`);
    }
    
    handleSubmit(e) {
	e.preventDefault();
	const { article } = this.state;
	const errors = validateArticle(article);
	if (!isEmptyObject(errors)) {
	    this.setState({ errors });
	} else {
	    if (!article.id) {
		this.addArticle(article);
	    } else {
		this.updateArticle(article);
	    }
	}
    }

    handleInputChange(article) {
	const { target } = article;
	const { name } = target;
	const value = target.type === 'checkbox' ? target.checked : target.value;

	this.setState(prevState => ({
	    article: {
		...prevState.article,
		[name]: value,
	    },
	}));
    }

    renderErrors() {
	const { errors } = this.state;
	if (isEmptyObject(errors)) {
	    return null;
	}

	return (
	        <div className="errors">
		<h3>The following errors prohibited the event from being saved:</h3>
		<ul>
		{Object.values(errors).map(error => (
		        <li key={error}>{error}</li>
		))}
	    </ul>
		</div>
	);
    }

    render() {
	const { article } = this.state;
	console.log(article);
	const { match } = this.props;
	if (!article.id && match.path === '/article/:id/edit') return <ArticleNotFound />;
	const cancelURL = article.id ? `/articles/${article.id}` : '/articles';
	return (
		<div>
		<h2>New Article</h2>
		{this.renderErrors()}
		<form className="articleForm" onSubmit={this.handleSubmit}>
		<div>
		<label htmlFor="title">
		<strong>Title:</strong>
		<input type="text" id="title" name="title" onChange={this.handleInputChange} value={article.title}/>
		</label>
		</div>
		<div>
		<label htmlFor="text">
		<strong>Text:</strong>
		<textarea cols="30" rows="10" id="text" name="text" onChange={this.handleInputChange} value={article.text}/>
		</label>
		</div>
		<div className="form-actions">
		<button type="submit">Save</button>
		<Link to={cancelURL}>Cancel</Link>
		</div>
		</form>
		</div>
	);
    }
}

ArticleForm.propTypes = {
    match: PropTypes.shape(),
};

ArticleForm.defaultProps = {
};


export default connect(mapStateToProps, null)(ArticleForm);
