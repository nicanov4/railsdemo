import './App.css';
import React from 'react';
import Editor from './Editor';
import { Route } from 'react-router-dom';
import { Alert } from '../helpers/notifications';

const App = () => (
    <div>
        <Route path="/articles/:id?" component={Editor} />
	<Alert stack={ { limit: 3 } } />
    </div>
);

export default App;