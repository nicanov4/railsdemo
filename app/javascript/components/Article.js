import { deleteArticle, deleteComment, fetchArticle, fetchComments } from '../actions/ArticleActions';
import PropsRoute from './PropsRoute';
import React from 'react';
import ArticleNotFound from './ArticleNotFound';
import Comments from './Comments';
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
	this.deleteComment = this.deleteComment.bind(this)
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
	if (this.props.isFetched) return <ArticleNotFound/>;
	return (
		<div className="articleContainer">
		<Breadcrumb>
		<Breadcrumb.Item href="/">Articles List</Breadcrumb.Item>
		<Breadcrumb.Item active>{this.props.article.title}</Breadcrumb.Item>
		</Breadcrumb>

		<h3>Title: {this.props.article.title}</h3>
	    
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
