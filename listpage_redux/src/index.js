import React from 'react';
import ReactDOM from 'react-dom';

import ShowList from './pages/ShowList';

import { Provider } from 'react-redux'

import store from './store'

ReactDOM.render(
    <Provider store={store}>
        <ShowList />
    </Provider>
    , document.getElementById('root') );
