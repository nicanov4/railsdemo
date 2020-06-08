import React from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types';
import TextInput from './TextInput';

let ArticleForm = props => {
    const { handleSubmit } = props
    return (
	    <div>
	    <form onSubmit={handleSubmit(props.onSubmit)}>
	    <label htmlFor="titleLabel">Title:</label>
	    <Field name="title" component={TextInput} />
	    <label htmlFor="textLabel">Text:</label>
	    <Field name="text" component={TextInput} />
	    <button type="submit">Submit</button>
	    </form>
	    </div>
    );
}

ArticleForm = reduxForm({
    form: 'article-form',
    enableReinitialize : true
})(ArticleForm)


ArticleForm.propTypes = {
    initialValues: PropTypes.shape(),
    onSubmit: PropTypes.func.isRequired,
};

export default ArticleForm;
