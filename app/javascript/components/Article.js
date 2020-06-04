import { deleteArticle, fetchArticle } from '../actions/ArticleActions';
import PropsRoute from './PropsRoute';
import React from 'react';
import ArticleNotFound from './ArticleNotFound';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
	article:state.article,
    };
};

class Article extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    isLoaded: false,
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
	this.props.dispatch(fetchArticle(this.state.articleId));
	console.log(this.props.article);
	this.setState({isLoaded: true});
    }
    
    render() {
	if (!this.state.isLoaded) return <ArticleNotFound/>;
	return (
		<div className="articleContainer">
		<Link to={{
		    pathname: `/articles/${this.state.articleId}/edit`,
		    state: {
			article: this.props.article,
		    }
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
