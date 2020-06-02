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
    }
    case "ADD_ARTICLE": {
	return {
	    ...state,
	    articles: [...state.articles, action.payload],
	}
    }
    case "UPDATE_ARTICLE": {
	const { id } = action.payload
	const newArticles = [...state.articles]
	const articleToUpdate = newArticles.findIndex(article => article.id === id)
	newArticles[articleToUpdate] = action.payload;

	return {
	    ...state,
	    articles: newArticles,
	}
    }
    case "DELETE_ARTICLE": {
	return {
	    ...state,
	    articles: state.articles.filter(article => article.id !== action.payload),
	}
    }
    }
    return state
}
