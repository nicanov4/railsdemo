
import { connect } from 'react-redux';
import React from 'react';
import { Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { handleAjaxError } from '../helpers/helpers';
import ArticleForm from './ArticleForm';
import PropsRoute from './PropsRoute';
import Article from './Article';
import { fetchArticles, addArticle, updateArticle, deleteArticle } from '../actions/ArticleActions';

const mapStateToProps = state => {
    const { article } = state
    return {
	isFetching: article.isFetching,
	article: article.article
    };
};

class Editor extends React.Component {
    constructor(props) {
	super(props);
	this.updateArticle = this.updateArticle.bind(this);
	this.addArticle = this.addArticle.bind(this);
    }

    addArticle(newArticle) {
	this.props.dispatch(addArticle(newArticle));
	const { history } = this.props;	
	history.push(`/articles`);
    }

    updateArticle(updatedArticle) {
	this.props.dispatch(updateArticle(updatedArticle, this.props.match.params.id));
	const { history } = this.props;
	history.push(`/articles`);
    }

    render() {
	return (
	        <div>
		<div className="grid">
		<Switch>
		<PropsRoute path="/articles/new" component={ArticleForm} onSubmit={this.addArticle}/>
		<PropsRoute exact path="/articles/:id/edit" component={ArticleForm}
	            article={this.props.article} onSubmit={this.updateArticle}/>
		</Switch>
		</div>
		</div>
	);
    }

}

Editor.propTypes = {
    match: PropTypes.shape(),
    history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

Editor.defaultProps = {
    match: undefined,
};


export default connect(mapStateToProps, null)(Editor);
