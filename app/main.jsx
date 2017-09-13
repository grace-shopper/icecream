import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import '../public/index.scss';
import Root from './components/Root.jsx';

ReactDOM.render(
	<Provider store={store}>

	  	<Router>
	  		<Root />
	  	</Router>

  </Provider>,
  document.getElementById('app')
);
