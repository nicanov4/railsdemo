import 'react-widgets/dist/css/react-widgets.css';
import SelectList from 'react-widgets/lib/SelectList'
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

momentLocalizer(moment)

const required = value => value ? undefined : 'Required'
const minValue = min => value => value && value.length < min ? `Must be at least ${min}` : undefined
const minValue5 = minValue(5)

const renderSelectList = ({ input, data }) => (
	<SelectList {...input}
    onBlur={() => input.onBlur()}
    data={data} />
)

const renderDateTimePicker = ({input: { onChange, value }, showTime, meta }) => (
      <div>
      <DateTimePicker
onChange={onChange}
format="DD MMM YYYY h:mm a"
time={showTime}
value={!value ? null : new Date(value)}
    />
    {meta.touched && ((meta.error && <span>{meta.error}</span>) || (meta.warning && <span>{meta.warning}</span>))}
</div>
)

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

	    <Form.Group controlId="formStatus">
	    <Form.Label>Do you want to publish or draft for the future?</Form.Label>
	    <Col sm="10">
	    <Field
	name="status"
	component={renderSelectList}
	data={[ 'Published', 'Draft' ]}/>
	    </Col>
	    </Form.Group>
	
	    <Form.Group controlId="formDate">
	    <Form.Label column sm="10">Choose a due date for your article: </Form.Label>
	    <Col sm="10">
	    <Field
	name="due_date"
	component={renderDateTimePicker}
	validate={required}
	    />
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
