import { reducer as formReducer } from 'redux-form'
import { combineReducers } from 'redux';

const articles = (state = { items: [], isFetching: false }, action) => {
    switch (action.type) {
    case "FETCH_ARTICLES_REQUEST": {
	return {
	    ...state,
	    isFetching: true
	}
    }
    case "FETCH_ARTICLES_REJECTED": {
	return {
	    ...state,
	    isFetching: false,
	    error: action.payload
	}
    }
    case "FETCH_ARTICLES_FULFILLED": {
	return {
	    isFetching: false,
	    items: action.payload
	}
    }
    case "ADD_ARTICLE": {
	const { nArticle } = action.payload;
	return {
	    ...state,
	    items: [...state.items, nArticle],
	}
    }
    case "UPDATE_ARTICLE": {
	const { uArticle } = action.payload
	const newArticles = [...state.items]
	const articleToUpdate = newArticles.findIndex(article => article.id === uArticle.id)
	newArticles[articleToUpdate] = uArticle;
	return {
	    ...state,
	    items: newArticles,
	}
    }
    case "DELETE_ARTICLE": {
	const { id } = action.payload;
	const newArticles = [...state.items]
	return {
	    ...state,
	    items: newArticles.filter(a => a.id !== Number(id)),
	}
    }
    default:
	return state;
    }
};


const article = (state = { article, isFetching: false }, action ) => {
    switch(action.type) {
    case "FETCH_ARTICLE_REQUEST": {
	return {
	    ...state,
	    isFetching: true
	}
    }
    case "FETCH_ARTICLE_SUCCESS": {
	return {
	    isFetching: false,
	    article: action.payload
	}
    }
    default:
	return state;
    }
}

const comments = (state = { items: [], isFetching: false }, action) => {
    switch(action.type) {
    case "FETCH_COMMENTS_REQUEST": {
	return {
	    ...state,
	    isFetching: true
	}
    }
    case "FETCH_COMMENTS_FULFILLED": {
	return {
	    isFetching: false,
	    items: action.payload
	}
    }
    case "ADD_COMMENT": {
	const { nComment } = action.payload;
	return {
	    ...state,
	    items: [...state.items, nComment],
	}
    }
    case "DELETE_COMMENT": {
	const { comment } = action.payload;
	const id = comment.id;
	const newComments = [...state.items]
	return {
	    ...state,
	    items: newComments.filter(c => c.id !== Number(id))
	}
    }
    default:
	return state;
    }
}

const rootReducer = combineReducers({
    article,
    articles,
    comments,
    form: formReducer
});
    
export default rootReducer;
