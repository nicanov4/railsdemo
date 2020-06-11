import { fetchArticles, deleteArticle } from '../actions/ArticleActions';
import React from 'react';
import moment from 'moment';
import ReactTable from "react-table";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import 'react-table/react-table.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

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
	this.deleteArticle = this.deleteArticle.bind(this);
	this.updateSearchTerm = this.updateSearchTerm.bind(this);
    }

    deleteArticle(articleId) {
	const sure = window.confirm('Are you sure?');
	if (sure) {
	    this.props.dispatch(deleteArticle(articleId));
	    const { history } = this.props;
            history.push(`/articles`);
	}
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
	    accessor: 'title',
	    Cell: cellInfo => <a href={ `/articles/${cellInfo.original.id}`}>{cellInfo.original.title}</a>
	},{
	    Header: 'Text',
	    accessor: 'text'
	},{
	    Header: 'Date Posted',
	    accessor: 'created_at',
	    Cell: cellInfo => <label>{ moment(cellInfo.original.created_at).format('MMMM Do YYYY')}</label>
	},{
	    Header:'Actions',
	    Cell: cellInfo => <div><Link to={{ pathname: `/articles/${cellInfo.original.id}/edit`,}}>                                                                                     <Button variant="success">Edit</Button>
		</Link>
		<Button variant="danger" onClick={() => this.deleteArticle(cellInfo.original.id)}>Delete</Button>
		</div>
	}]
	const articles = this.props.articles;
	const filteredArticles = articles
	      .filter(el => this.matchSearchTerm(el));
	return (
	        <section className="articleList">
		<div>
		<Breadcrumb>
		<Breadcrumb.Item active>Articles List</Breadcrumb.Item>
		</Breadcrumb>
		</div>

		<div>
		<h2>Articles</h2>
		<Row>
		<Col xs lg="2">
		<input
	    className="search"
	    placeholder="Search"
	    type="text"
	    ref={this.searchInput}
	    onKeyUp={this.updateSearchTerm}
	        />
		</Col>
		<Col xs lg="2">
		<Link to="articles/new">New Article</Link>
		</Col>
		</Row>
		</div>
		<div>
		<ReactTable
	    data={filteredArticles}
	    columns={columns}

	        />
		</div>
		</section>
	);
    }
}


export default connect(mapStateToProps, null)(ArticlesList);
