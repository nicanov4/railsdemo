import { fetchArticles } from '../actions/ArticleActions';
import React from 'react';
import ReactTable from "react-table";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

const mapStateToProps = state => {
    const { articles } = state;
    return {
	isFetching: articles.isFetching,
	articles: articles.items
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

    componentDidMount() {
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
    
    
    render() {
	const columns = [{
	    Header: 'Title',
	    accessor: 'title'
	},{
	    Header: 'Text',
	    accessor: 'text'
	}]  
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
	    
		<div>
		<ReactTable
	    data={this.props.articles}
	    columns={columns}

	        />
		</div>        
		</section>
	);
    }
}


export default connect(mapStateToProps, null)(ArticlesList);
