import React from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types';
import TextInput from './TextInput';

const required = value => value ? undefined : 'Required'
const minValue = min => value => value && value.length < min ? `Must be at least ${min}` : undefined
const minValue5 = minValue(5)

let ArticleForm = props => {
    const { handleSubmit, submitting } = props
    return (
	    <div>
	    <form onSubmit={handleSubmit(props.onSubmit)}>
	    <label htmlFor="titleLabel">Title:</label>
	    <Field name="title" component={TextInput} validate={[required, minValue5]}/>
	    <label htmlFor="textLabel">Text:</label>
	    <Field name="text" component={TextInput}  validate={required}/>
	    <button type="submit" disabled={submitting}>Submit</button>
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
