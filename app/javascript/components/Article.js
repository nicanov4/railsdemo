import React from 'react';
import PropTypes from 'prop-types';

const Article = ({ article }) => (

	<div className="articleContainer">
	<ul>
	<li>
	<strong>Title:</strong>
	{' '}
    {article.title}
    </li>
	<li>
	<strong>text:</strong>
	{' '}
    {article.text}
          </li>
        </ul>
	</div>
);

Article.propTypes = {
    article: PropTypes.shape(),
};

Article.defaultProps = {
    article: undefined,
};

export default Article;
