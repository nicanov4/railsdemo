
import { connect } from 'react-redux';
import React from 'react';
import { success } from '../helpers/notifications';
import axios from 'axios';
import ArticlesList from './ArticlesList';
import { Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { handleAjaxError } from '../helpers/helpers';
import ArticleForm from './ArticleForm';
import PropsRoute from './PropsRoute';
import Article from './Article';
import { fetchArticles, addArticle, updateArticle, deleteArticle } from '../actions/ArticleActions';

const mapStateToProps = state => {
    return {
	articles: state.articles,
    };
};

class Editor extends React.Component {
    constructor(props) {
	super(props);
	this.updateArticle = this.updateArticle.bind(this);
	this.addArticle = this.addArticle.bind(this);
	this.deleteArticle = this.deleteArticle.bind(this);
    }

    componentWillMount() {
	this.props.dispatch(fetchArticles());
    }

    addArticle(newArticle) {
	this.props.dispatch(addArticle(newArticle));
	const { history } = this.props;
	
	history.push(`/articles`);
    }

    updateArticle(updatedArticle) {
	this.props.dispatch(updateArticle(updatedArticle));
	const { history } = this.props;
	history.push(`/articles/${updatedArticle.id}`);
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
	if (this.props.articles === null) return null;

	const { match } = this.props;
	const articleId = match.params.id;
	const article = this.props.articles.find(a => a.id === Number(articleId));

	return (
	        <div>
		<div className="grid">
		<ArticlesList articles={this.props.articles}  activeId={Number(articleId)}/>
		<Switch>
		<PropsRoute path="/articles/new" component={ArticleForm} onSubmit={this.addArticle}/>
		<PropsRoute
	    exact
	    path="/articles/:id/edit"
	    component={ArticleForm}
	    article={article}
	    onSubmit={this.updateArticle}
	        />
		<PropsRoute path="/articles/:id" component={Article} article={article} onDelete={this.deleteArticle}/>
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
