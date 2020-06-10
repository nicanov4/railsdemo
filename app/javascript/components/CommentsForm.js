import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import TextInput from './shared/TextInput';
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types';

const required = value => value ? undefined : 'Required'

const normalizeBoolean = value => {
    if (value === "true") {
	return true;
    }

    if (value === "false") {
	return false;
    }

    return value;
};

let CommentsForm = props => {
    const { handleSubmit, submitting } = props
    return (
	    <div>
	    <Form onSubmit={handleSubmit(props.onSubmit)}>

	    <Form.Group controlId="formIsPrivate">
	    <Form.Label>Private Comment?</Form.Label>
	    <div>
	    <Form.Label><Field name="isPrivate" component="input" type="radio" value="false" normalize={normalizeBoolean}/> Public</Form.Label>
	    <Form.Label><Field name="isPrivate" component="input" type="radio" value="true"normalize={normalizeBoolean}/> Private</Form.Label>
	    </div>
	    </Form.Group>
	
	    <Form.Group controlId="formBody">
	    <Form.Label column sm="2">Enter a Comment:</Form.Label>
	    <Col sm="10">
	    <Field name="body" component={TextInput} validate={ required }/>
	    </Col>
	    </Form.Group>

	    <Button sm="2" variant="primary" type="submit" disabled={submitting} size="sm">Submit</Button>
	    </Form>
	    </div>
    );
}

CommentsForm = reduxForm({
    form: 'comments-form',
    enableReinitialize : true
})(CommentsForm)


CommentsForm.propTypes = {
   onSubmit: PropTypes.func.isRequired,
};

export default CommentsForm;
