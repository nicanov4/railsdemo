import './App.css';
import React from 'react';
import Editor from './Editor';
import { Route } from 'react-router-dom';
import PropsRoute from './PropsRoute';
import { Alert } from '../helpers/notifications';
import { Provider } from 'react-redux';
import ArticlesList from './ArticlesList';
import Article from './Article';
import ArticleForm from './ArticleForm';
import { Switch } from 'react-router-dom';

const App = () => (
	<div>
	<Switch>
	<Route path="/articles/:id/edit" component={ArticleForm} />
	<Route path="/articles/new" component={ArticleForm} />
	<Route path="/articles/:id" component={Article} />
	<Route path="/articles" component={ArticlesList} />
        </Switch>
	<Alert stack={ { limit: 3 } } />
	</div>
);

export default App;
