import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ArticlesList extends React.Component {
    renderArticles() {
	const { activeId, articles } = this.props;
	return articles.map(article => (
		<Link to={`/articles/${article.id}`} className={activeId === article.id ? 'active' : ''}>
	    <li key={article.id}>
		    {"title: "}
	            {article.title }
	            {' - '} 
	            {'text:' }
	            {article.text }
	    </li>
	  </Link>
	));
    }

    render() {
	return (
	        <section className="articleList">
		<h2>Articles
	            <Link to="/articles/new">New Article</Link>
	        </h2>
		<ul>{this.renderArticles()}</ul>
		</section>
	);
    }
}

ArticlesList.propTypes = {
    activeId: PropTypes.number,
    articles: PropTypes.arrayOf(PropTypes.object),
};

ArticlesList.defaultProps = {
    activeId: undefined,
    articles: [],
};

export default ArticlesList;
