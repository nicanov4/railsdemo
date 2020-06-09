import React from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const required = value => value ? undefined : 'Required'
const minValue = min => value => value && value.length < min ? `Must be at least ${min}` : undefined
const minValue5 = minValue(5)

let ArticleForm = props => {
    const { handleSubmit, submitting } = props
    return (
	    <div>
	    <Form onSubmit={handleSubmit(props.onSubmit)}>

	    <Form.Group controlId="formTitle">
	    <Form.Label column sm="2">Title:</Form.Label>
	    <Col sm="10">
	    <Field name="title" component={TextInput} validate={[required, minValue5]}/>
	    </Col>
	    </Form.Group>
	    
	    <Form.Group controlId="formText">
	    <Form.Label column sm="2">Text:</Form.Label>
	    <Col sm="10">
	    <Field name="text" component={TextInput}  validate={required}/>
	    </Col>
	    </Form.Group>
	    
	    <Button sm="2" variant="primary" type="submit" disabled={submitting} size="lg">Submit</Button>
	    </Form>
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
