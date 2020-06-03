export default function reducer(state={
    articles: [],
    fetching: false,
    fetched: false,
    error: null,
}, action) {

    switch (action.type) {
    case "FETCH_ARTICLES": {
	return {...state, fetching: true}
    }
    case "FETCH_ARTICLES_REJECTED": {
	return {...state, fetching: false, error: action.payload}
    }
    case "FETCH_ARTICLES_FULFILLED": {
	return {
	    fetching: false,
	    fetched: true,
	    articles: action.payload,
	}
	console.log(articles);
    }
    case "ADD_ARTICLE": {
	const { nArticle } = action.payload;
	console.log(nArticle);
	return {
	    ...state,
	    articles: [...state.articles, nArticle],
	}
    }
    case "UPDATE_ARTICLE": {
	const { uArticle } = action.payload
	const newArticles = [...state.articles]
	const articleToUpdate = newArticles.findIndex(article => article.id === uArticle.id)
	newArticles[articleToUpdate] = uArticle;

	return {
	    ...state,
	    articles: newArticles,
	}
    }
    case "DELETE_ARTICLE": {
	const { id } = action.payload;
	return {
	    ...state,
	    articles: state.articles.filter(article => article.id !== id),
	}
    }
    }
    return state
}
