import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import '../public/index.scss';
import AllProducts from './Components/AllProducts'

ReactDOM.render(
	<Provider store={store}>
  	<h2> hello world </h2>
  </Provider>,
  document.getElementById('app')
);
