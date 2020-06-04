import { deleteArticle, fetchArticle } from '../actions/ArticleActions';
import PropsRoute from './PropsRoute';
import React from 'react';
import ArticleNotFound from './ArticleNotFound';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
	article: state.article,
	fetched: state.fetched,
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
	    this.props.dispatch(deleteArticle(this.state.articleId));
	    const { history } = this.props;
	    history.push(`/articles`);
	}
    }
    
    componentDidMount() {
	console.log("hi");
	this.props.dispatch(fetchArticle(this.state.articleId));
    }
    
    render() {
	console.log(this.props.fetched);
	if (!this.props.fetched) return <ArticleNotFound/>;
	return (
		<div className="articleContainer">
		<Link to={{
		    pathname: `/articles/${this.state.articleId}/edit`,
		}}>Edit</Link>
		<button className="delete" type="button" onClick={() => this.deleteArticle()}>
		Delete
	    </button>
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
