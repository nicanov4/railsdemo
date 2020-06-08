import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ArticleForm from './shared/ArticleForm';
import { fetchArticle, updateArticle } from '../actions/ArticleActions';

const mapStateToProps = state => {
    const { article } = state
    return {
	isFetching: article.isFetching,
	article: article.article
    };
};

class EditArticle extends React.Component {
    constructor(props) {
	super(props);
	this.updateArticle = this.updateArticle.bind(this);
    }
    
    componentDidMount() {
	this.props.dispatch(fetchArticle(this.props.match.params.id));
    }

    updateArticle(updatedArticle) {
	this.props.dispatch(updateArticle(updatedArticle, this.props.match.params.id));
	const { history } = this.props;
	history.push(`/articles`);
    }

    render() {
	return (
		<div>
		<ArticleForm initialValues={this.props.article} onSubmit={this.updateArticle}>
		</ArticleForm>
		</div>
	);
    }
}

EditArticle.propTypes = {
    match: PropTypes.shape(),
    history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

EditArticle.defaultProps = {
    match: undefined
}

export default connect(mapStateToProps, null)(EditArticle);
