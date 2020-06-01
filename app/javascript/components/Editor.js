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

class Editor extends React.Component {
    constructor(props) {
	super(props);

	this.state = {
	    articles: null,
	};
	this.updateArticle = this.updateArticle.bind(this);
	this.addArticle = this.addArticle.bind(this);
	this.deleteArticle = this.deleteArticle.bind(this);
    }

    componentDidMount() {
	axios
	    .get('/api/articles.json')
	    .then(response => this.setState({ articles: response.data }))
	    .catch(handleAjaxError);
    }

    addArticle(newArticle) {
	axios
	    .post('/api/articles.json', newArticle)
	    .then((response) => {
		success('Article Added!');
		const savedArticle = response.data;
		this.setState(prevState => ({
		    articles: [...prevState.articles, savedArticle],
		}));
		const { history } = this.props;
		history.push(`/articles/${savedArticle.id}`);
	    })
	    .catch(handleAjaxError);
    }

    updateArticle(updatedArticle) {
	axios
	    .put(`/api/articles/${updatedArticle.id}.json`, updatedArticle)
	    .then(() => {
		success('Article updated');
		const { articles } = this.state;
		const idx = articles.findIndex(article => article.id === updatedArticle.id);
		articles[idx] = updatedArticle;
		const { history } = this.props;
		history.push(`/articles/${updatedArticle.id}`);
		this.setState({ articles });
	    })
	    .catch(handleAjaxError);
    }

    deleteArticle(articleId) {
	const sure = window.confirm('Are you sure?');
	if (sure) {
	    axios
	        .delete(`/api/articles/${articleId}.json`)
	        .then((response) => {
		    if (response.status === 204) {
			success('Article deleted');
			const { history } = this.props;
			history.push('/articles');

			const { articles } = this.state;
			this.setState({ articles: articles.filter(article => article.id !== articleId) });
		    }
		})
	        .catch(handleAjaxError);
	}
    }

    render() {
	const { articles } = this.state;
	if (articles === null) return null;

	const { match } = this.props;
	const articleId = match.params.id;
	const article = articles.find(a => a.id === Number(articleId));
	
	return (
	        <div>
		<div className="grid">
		<ArticlesList articles={articles}  activeId={Number(articleId)}/>
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

export default Editor;
