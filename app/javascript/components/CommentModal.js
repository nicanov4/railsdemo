import React from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

class CommentModal extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    show: false,
	}
	this.handleShow = this.handleShow.bind(this);
	this.handleClose = this.handleClose.bind(this);
    }

    handleShow() {
	this.setState({show: true});
    }

    handleClose() {
	this.setState({show: false});
    }

    render() {
	return (
		<div>
		<Button variant="primary" size="sm" onClick={this.handleShow}>Show Comment</Button>

	        <Modal show={this.state.show} onHide={this.handleClose}>
		<Modal.Header closeButton>
		<Modal.Title>Comment: </Modal.Title>
		</Modal.Header>
		<Modal.Body>{this.props.comment.body}</Modal.Body>
		</Modal>
		</div>
	);
    }
}

CommentModal.propTypes = {
    comment: PropTypes.shape(),
};

CommentModal.defaultProps = {
    comment: undefined,
};

export default CommentModal;
