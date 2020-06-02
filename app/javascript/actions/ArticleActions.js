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

export function addArticle(id, title, text) {
    return {
	type: 'ADD_ARTICLE',
	payload: {
	    id,
	    title,
	    text,
	},
    }
}

export function updateArticle(id, title, text) {
    return {
	type: 'UPDATE_ARTICLE',
	payload: {
	    id,
	    title,
	    text,
	},
    }
}

export function deleteArticle(id) {
    return {
	type: 'DELETE_ARTICLE',
	payload: {
	    id,
	},
    }
}
	  
