import { deleteArticle, fetchArticle } from '../actions/ArticleActions';
import PropsRoute from './PropsRoute';
import React from 'react';
import ArticleNotFound from './ArticleNotFound';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const mapStateToProps = state => {
    const { article } = state
    return {
	isFetching: article.isFetching,
	article: article.article
    };
};

class Article extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    articleId: props.match.params.id,
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
    }
    
    render() {
	if (this.props.isFetched) return <ArticleNotFound/>;
	return (
		<div className="articleContainer">
		<Breadcrumb>
		<Breadcrumb.Item href="/">Articles List</Breadcrumb.Item>
		<Breadcrumb.Item active>{this.props.article.title}</Breadcrumb.Item>
		</Breadcrumb>
		<Link to={{
		    pathname: `/articles/${this.state.articleId}/edit`,
		}}>
		<Button variant="success">Edit</Button>
		</Link>
		<Button variant="danger" onClick={() => this.deleteArticle()}>
		Delete
	    </Button>
		<ul>
		<strong>Title:</strong>
		<li>
		{this.props.article.title}
	    </li>
		<li>
		<strong>Text:</strong>
		{' '}
	    {this.props.article.text}
	    </li>
		</ul>
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
