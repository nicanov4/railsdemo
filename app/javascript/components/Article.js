import { deleteArticle } from '../actions/ArticleActions';
import PropsRoute from './PropsRoute';
import React from 'react';
import ArticleNotFound from './ArticleNotFound';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
	articles:state.articles,
    };
};

class Article extends React.Component {
    constructor(props) {
	super(props);
    }

    deleteArticle(articleId) {
	const sure = window.confirm('Are you sure?');
	if (sure) {
	    this.props.dispatch(deleteArticle(articleId));
	    const { history } = this.props;
	    history.push(`/articles`);
	}
    }

    render() {
	const { match } = this.props;
	const articleId = match.params.id;
	const article = this.props.articles.find(a => a.id === Number(articleId));

	if (!article) return <ArticleNotFound/>;

	return (
		<div className="articleContainer">
		<Link to={{
		    pathname: `/articles/${article.id}/edit`,
		    state: {
			article: article,
		    }
		}}>Edit</Link>
		<button className="delete" type="button" onClick={() => this.deleteArticle(article.id)}>
		Delete
	    </button>
		<ul>
		<strong>Title:</strong>
		<li>
		{article.title}
	    </li>
		<li>
		<strong>Text:</strong>
		{' '}
	    {article.text}
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
