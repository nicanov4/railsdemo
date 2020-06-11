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
		<a cursor="pointer" onClick={this.handleShow}>{this.props.comment.commenter}: {this.props.comment.body}</a>

	        <Modal show={this.state.show} onHide={this.handleClose}>
		<Modal.Header closeButton>
		<Modal.Title>Comment by {this.props.comment.commenter}: </Modal.Title>
		</Modal.Header>
		<Modal.Body>{this.props.comment.body}</Modal.Body>
		<Button variant="danger" size="sm"  type="button" onClick={() => this.props.onDelete(this.props.comment)}>Delete Comment</Button>
		</Modal>
		</div>
	);
    }
}

CommentModal.propTypes = {
    onDelete: PropTypes.func.isRequired,
    comment: PropTypes.shape(),
};

CommentModal.defaultProps = {
    comment: undefined,
};

export default CommentModal;
