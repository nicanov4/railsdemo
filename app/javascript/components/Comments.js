import React from 'react';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import CommentsNotFound from './CommentsNotFound';
import CommentModal from './CommentModal';

const Comments = ({comments, onDelete}) => {
    if (comments.items.length === 0) { return(<CommentsNotFound></CommentsNotFound>)}
    return (
	    <div>
	    <ListGroup as="ul">
	    {comments.items.map(comment => (
		    <div key={comment.id}>
		    <ListGroup.Item as="li"  key={comment.id}>
		    <Row>{comment.commenter}: {comment.body}</Row>
		    <Row><CommentModal comment={comment}></CommentModal>
		    {<Button variant="danger" size="sm"  type="button" onClick={() => onDelete(comment)}>Delete Comment</Button>}</Row>
		    </ListGroup.Item>
		    </div>
	    ))}
	</ListGroup>
	    </div>
    );
};

Comments.propTypes = {
     comments: PropTypes.shape(),
};

Comments.defaultProps = {
    comments: undefined
};

export default Comments;
