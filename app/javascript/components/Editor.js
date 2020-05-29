import React from 'react';
import axios from 'axios';
import ArticlesList from './ArticlesList';

class Editor extends React.Component {
    constructor(props) {
	super(props);

	this.state = {
	    articles: null,
	};
    }

    componentDidMount() {
	axios
	    .get('/api/articles.json')
	    .then(response => this.setState({ articles: response.data }))
	    .catch((error) => {
		console.log(error);
	    });
    }

    render() {
	const { articles } = this.state;
	if (articles === null) return null;

	return (
	        <div>
		<ArticlesList articles={articles} />
		</div>
	);
    }
}

export default Editor;
