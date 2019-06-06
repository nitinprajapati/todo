import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import {Provider} from 'react-redux';
import { createStore } from "redux";
import allReducer from './allReducers';
import { composeWithDevTools } from 'redux-devtools-extension';


import 'bootstrap/dist/css/bootstrap.min.css';

import * as serviceWorker from './serviceWorker';

const store = createStore(
    allReducer,
    composeWithDevTools()
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
