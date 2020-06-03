
import React from 'react';
import ArticleNotFound from './ArticleNotFound';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Article = ({ article, onDelete }) => {
        if (!article) return <ArticleNotFound />;
    return (
	<div className="articleContainer">
	<Link to={`/articles/${article.id}/edit`}>Edit</Link>
	<button className="delete" type="button" onClick={() => onDelete(article.id)}>
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
    };

Article.propTypes = {
    onDelete: PropTypes.func.isRequired,
    article: PropTypes.shape(),
};

Article.defaultProps = {
    article: undefined
};

export default Article;
