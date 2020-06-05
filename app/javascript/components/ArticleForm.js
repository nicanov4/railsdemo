import React from 'react';
import EventNotFound from './ArticleNotFound';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isEmptyObject, validateArticle } from '../helpers/helpers';
import { Field, reduxForm } from 'redux-form';

class ArticleForm extends React.Component {
    constructor(props) {
	super(props);

	this.state = {
	    article: props.article,
	    errors: {},
	};

	this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
	e.preventDefault();
	const { article } = this.state;
	const errors = validateArticle(article);
	if (!isEmptyObject(errors)) {
	    this.setState({ errors });
	} else {
	    const { onSubmit } = this.props;
	    onSubmit(article);
	}
    }

    
    render() {
	const { article } = this.state;
	const { path } = this.props;

	if (!event.id && path === '/events/:id/edit') return <EventNotFound />;

	const cancelURL = article.id ? `/articles/${article.id}` : '/articles';
	return (
		<div>
		<h2>New Article</h2>
		<form className="articleForm" onSubmit={this.handleSubmit}>
		<div>
		<label htmlFor="title">
		<strong>Title:</strong>
		<Field name="title" id="title" component="input" type="text" value={article.title}/>
		</label>
		</div>
		<div>
		<label htmlFor="text">
		<strong>Text:</strong>
		<Field name="text" id="text" component="input" type="text" value={article.text}/>
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
    article: PropTypes.shape(),
    path: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

ArticleForm.defaultProps = {
    article: {
	title: '',
	text: '',
    },
};

ArticleForm = reduxForm({
    form: 'contact'
})(ArticleForm)

export default ArticleForm;
