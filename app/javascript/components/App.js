import React from 'react';
import NewArticle from './NewArticle';
import EditArticle from './EditArticle';
import { Route } from 'react-router-dom';
import PropsRoute from './PropsRoute';
import { Alert } from '../helpers/notifications';
import { Provider } from 'react-redux';
import ArticlesList from './ArticlesList';
import Article from './Article';
import { Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const App = () => (
	<div>
	<Switch>
	<Route exact path="/articles/:id/edit" component={EditArticle} />
	<Route exact path="/articles/new" component={NewArticle} />
	<Route exact path="/articles/:id" component={Article} />
	<Route exact path="/articles" component={ArticlesList} />
        </Switch>
	<Alert stack={ { limit: 3 } } />
	</div>
);

export default App;
