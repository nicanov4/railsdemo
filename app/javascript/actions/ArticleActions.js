import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';


import axios from "axios";

export function fetchArticles() {
    return function(dispatch) {
	dispatch({ type: "FETCH_ARTICLES_REQUEST"});
	axios.get('/api/articles.json')
	    .then((response) => {
		dispatch({type: "FETCH_ARTICLES_FULFILLED", payload: response.data})
	    }).catch((err) => {
		dispatch({type: "FETCH_ARTICLES_REJECTED", payload: err})
	    })
    }
}

export function fetchArticle(articleId) {
    return function(dispatch) {
	dispatch({ type: "FETCH_ARTICLE_REQUEST"});
	axios.get(`/api/articles/${articleId}.json`)
	    .then((response) => {
		dispatch({type:"FETCH_ARTICLE_SUCCESS", payload: response.data})
	    })
    }
}

export function addArticle(newArticle) {
    return function(dispatch) {
	axios.post('/api/articles.json', newArticle)
	    .then((response) => {
		success('Article Added');
		const nArticle = response.data
		dispatch({
		    type: 'ADD_ARTICLE',
		    payload: {
			nArticle,
		    },
		})
	    })
    }
}

export function updateArticle(updatedArticle, articleId) {
    return function(dispatch) {
	axios.put(`/api/articles/${articleId}.json`, updatedArticle)
	    .then((response) => {
		success('Article Updated');
		const uArticle = response.data
		dispatch({
		    type: 'UPDATE_ARTICLE',
		    payload: {
			uArticle,
		    },
		})
	    })
    }
}

export function deleteArticle(id) {
    return function(dispatch) {
	axios.delete(`/api/articles/${id}.json`)
	    .then((response) => {
		success('Article Deleted');
		dispatch({
		    type: 'DELETE_ARTICLE',
		    payload: {
			id,
		    },
		})
	    })
    }
}


