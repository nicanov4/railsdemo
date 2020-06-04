// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

//require("@rails/ujs").start()
require("@rails/activestorage").start()
require("channels")


import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { fetchArticles } from '../actions/ArticleActions';
import reducer from '../reducers/ArticleReducer';

const store = createStore(reducer, applyMiddleware(thunk));
document.addEventListener('DOMContentLoaded', () => {
    render(
	    <BrowserRouter>
	    <Provider store = {store}>
	    <App />
	    </Provider>
	</BrowserRouter>,
	document.querySelector('#root'));
});

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)
