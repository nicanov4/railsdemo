import React from 'react';
import PropTypes from 'prop-types';

class ArticlesList extends React.Component {
    renderArticles() {
	const { articles } = this.props;
	return articles.map(article => (
	        <li key={article.id}>
		{"title:"}
	        {article.title}
	        {'text:'}
	        {article.text}
	    </li>
	));
    }

    render() {
	return (
	        <section>
		<h2>Articles</h2>
		<ul>{this.renderArticles()}</ul>
		</section>
	);
    }
}

ArticlesList.propTypes = {
    articles: PropTypes.arrayOf(PropTypes.object),
};

ArticlesList.defaultProps = {
    articles: [],
};

export default ArticlesList;
