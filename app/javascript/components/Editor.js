import React from 'react';
import axios from 'axios';
import ArticlesList from './ArticlesList';
import { Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import ArticleForm from './ArticleForm';
import PropsRoute from './PropsRoute';
import Article from './Article';

class Editor extends React.Component {
    constructor(props) {
	super(props);

	this.state = {
	    articles: null,
	};
    }

    componentDidMount() {
	axios
	    .get('/api/articles.json')
	    .then(response => this.setState({ articles: response.data }))
	    .catch((error) => {
		console.log(error);
	    });
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
		<switch>
		<PropsRoute path="/articles/new" component={ArticleForm}/>
		<PropsRoute path="/articles/:id" component={Article} article={article} />
		</switch>
	        </div>
		</div>
	);
    }
}

Editor.propTypes = {
    match: PropTypes.shape(),
};

Editor.defaultProps = {
    match: undefined,
};

export default Editor;
