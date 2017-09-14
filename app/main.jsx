import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from './store';
import '../public/index.scss';
import Root from './components/Root.jsx';

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider> 
		  	<Router>
		  		<Root />
		  	</Router>
		</MuiThemeProvider> 
  </Provider>,
  document.getElementById('app')
);
