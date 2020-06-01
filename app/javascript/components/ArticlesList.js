import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ArticlesList extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    searchTerm: '',
	};

	this.searchInput = React.createRef();
	this.updateSearchTerm = this.updateSearchTerm.bind(this);
    }
    
    updateSearchTerm() {
	this.setState({ searchTerm: this.searchInput.current.value });
    }

    matchSearchTerm(obj) {
	const {
	    id, published, created_at, updated_at, ...rest
	} = obj;
	const { searchTerm } = this.state;

	return Object.values(rest).some(
	    value => value.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
	);
    }
    
    renderArticles() {
	const { activeId, articles } = this.props;
	const filteredArticles = articles
	      .filter(el => this.matchSearchTerm(el));
	return filteredArticles.map(article => (
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

		<input
	        className="search"
	        placeholder="Search"
	        type="text"
	        ref={this.searchInput}
	        onKeyUp={this.updateSearchTerm}
	        />
	    
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
