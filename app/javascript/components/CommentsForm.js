import React from 'react';
import 'react-widgets/dist/css/react-widgets.css';
import SelectList from 'react-widgets/lib/SelectList'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import TextInput from './shared/TextInput';
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types';

const required = value => value ? undefined : 'Required'

const renderSelectList = ({ input, data }) =>
      <SelectList {...input}
onBlur={() => input.onBlur()}
data={data} />

let CommentsForm = props => {
    const { handleSubmit, submitting } = props
    return (
	    <div>
	    <Form onSubmit={handleSubmit(props.onSubmit)}>
	
	    <Form.Group controlId="formBody">
	    <Form.Label column sm="10">Enter a Comment:</Form.Label>
	    <Col sm="10">
	    <Field name="body" component={TextInput} validate={ required }/>
	    </Col>
	    </Form.Group>

	    <Form.Group controlId="formIsPrivate">
	    <Form.Label column sm="10">Private Comment?</Form.Label>
	    <Col sm="10">
	    <Field
	name="public"
	component={renderSelectList}
	data={[ 'Private', 'Public' ]}/>
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
