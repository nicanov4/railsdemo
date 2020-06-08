import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ArticleForm from '../shared/ArticleForm';
import { addArticle } from '../actions/ArticleActions';

const mapStateToProps = state => {
    const { article } = state
    return {
	isFetching: article.isFetching,
	article: article.article,
    };
};

class NewArticle extends React.Component {
    constructor(props) {
	super(props);
	this.addArticle = this.addArticle.bind(this);
    }
    
    addArticle(newArticle) {
	console.log(newArticle);
	this.props.dispatch(addArticle(newArticle));
	const { history } = this.props;
	history.push(`/articles`);
    }
    
    render() {
	return (
		<div>
		<ArticleForm onSubmit={this.addArticle}>
		</ArticleForm>
		</div>
	);
    }
}

NewArticle.propTypes = {
    history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default connect(mapStateToProps, null)(NewArticle);
