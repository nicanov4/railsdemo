import { fetchArticles } from '../actions/ArticleActions';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';


const mapStateToProps = state => {
    return {
	articles: state.articles,
    };
};

class ArticlesList extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    searchTerm: '',
	};

	this.searchInput = React.createRef();
	this.updateSearchTerm = this.updateSearchTerm.bind(this);
    }

    componentWillMount() {
	this.props.dispatch(fetchArticles());
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
	const articles = this.props.articles;
	const filteredArticles = articles
	      .filter(el => this.matchSearchTerm(el));
	return filteredArticles.map((article) => (
		<li key={article.id}>
		<Link to={`/articles/${article.id}`}>
	            {"title: "}
	            {article.title }
	            {' - '} 
	            {'text:' }
	            {article.text }
	    </Link>
		</li>
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


export default connect(mapStateToProps, null)(ArticlesList);
