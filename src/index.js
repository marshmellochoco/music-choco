// dependancy import
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// component import
import './index.css';
import { rootReducer } from './store/rootReducer';
import { MainContainer } from './MainContainer';

const store = createStore(rootReducer);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<MainContainer />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// TODO: add playlist, favouraite
// TODO: save queue on database
// TODO: fix seek to function
