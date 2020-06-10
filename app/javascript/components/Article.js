import { deleteArticle, addComment, deleteComment, fetchArticle, fetchComments } from '../actions/ArticleActions';
import PropsRoute from './PropsRoute';
import React from 'react';
import moment from 'moment';
import ArticleNotFound from './ArticleNotFound';
import Comments from './Comments';
import CommentsForm from './CommentsForm';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const mapStateToProps = state => {
    const { article } = state
    const { comments } = state
    return {
	isFetching: article.isFetching,
	article: article.article,
	comments: comments
    };
};

class Article extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    articleId: props.match.params.id,
	}
	this.deleteComment = this.deleteComment.bind(this);
	this.addComment = this.addComment.bind(this);
    }

    addComment(comment) {
	console.log(comment);
	this.props.dispatch(addComment(comment, this.props.match.params.id));
    }
    
    deleteComment(comment) {
	const sure = window.confirm('Are you sure?');
	if(sure) {
	    this.props.dispatch(deleteComment(comment));
	}
    }
    
    deleteArticle() {
	const sure = window.confirm('Are you sure?');
	if (sure) {
	    this.props.dispatch(deleteArticle(this.props.match.params.id));
	    const { history } = this.props;
	    history.push(`/articles`);
	}
    }
    
    componentDidMount() {
	this.props.dispatch(fetchArticle(this.state.articleId));
	this.props.dispatch(fetchComments(this.state.articleId));
    }
    
    render() {
	var date = moment(this.props.article.created_at).format('MMMM Do YYYY');
	if (this.props.isFetched) return <ArticleNotFound/>;
	return (
		<div className="articleContainer">
		<Breadcrumb>
		<Breadcrumb.Item href="/">Articles List</Breadcrumb.Item>
		<Breadcrumb.Item active>{this.props.article.title}</Breadcrumb.Item>
		</Breadcrumb>
		<h3>Title: {this.props.article.title}</h3>
		<Row>
		<Col>
		<label>Posted on {date}</label>
		</Col>
		</Row>
		<Link to={{
		    pathname: `/articles/${this.state.articleId}/edit`,
		}}>
		<Button variant="success">Edit</Button>
		</Link>
		<Button variant="danger" onClick={() => this.deleteArticle()}>
		Delete
	    </Button>
		
		<Row>
		<Col>
		<h4>Text:</h4>
		</Col>
		</Row>
		<Row>
		<Col>{this.props.article.text}</Col>
		</Row>

		<h4>Comments: </h4>
		<Comments comments={this.props.comments} onDelete={this.deleteComment}/>
		<CommentsForm onSubmit={this.addComment}></CommentsForm>

	    </div>
	);
    }
}

Article.propTypes = {
    match: PropTypes.shape(),
    history: PropTypes.shape({push: PropTypes.func}).isRequired,
};

Article.defaultProps = {
    match: undefined
};

export default connect(mapStateToProps, null)(Article);
