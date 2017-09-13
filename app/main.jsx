import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import '../public/index.scss';
import AllProducts from './Components/AllProducts'

ReactDOM.render(
	<Provider store={store}>
  	<AllProducts/>
  </Provider>,
  document.getElementById('app')
);
