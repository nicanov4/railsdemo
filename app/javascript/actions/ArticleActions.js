import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';

import axios from "axios";

export function fetchArticles() {
    return function(dispatch) {
	axios.get('/api/articles.json')
	    .then((response) => {
		dispatch({type: "FETCH_ARTICLES_FULFILLED", payload: response.data})
	    }).catch((err) => {
		dispatch({type: "FETCH_ARTICLES_REJECTED", payload:err})
	    })
    }
}

export function addArticle(newArticle) {
    return function(dispatch) {
	axios.post('/api/articles.json', newArticle)
	    .then((response) => {
		success('Article Added');
		dispatch({
		    type: 'ADD_ARTICLE',
		    payload: {
			newArticle,
		    },
		})
	    })
    }
}

export function updateArticle(updatedArticle) {
    return function(dispatch) {
	axios.put(`/api/articles/${updatedArticle.id}.json`, updatedArticle)
	    .then((response) => {
		success('Article Updated');
		dispatch({
		    type: 'UPDATE_ARTICLE',
		    payload: {
			updatedArticle
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
		 
	  
