import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import axios from 'axios';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';

// Sagas --------------------

// Create the watcherSaga generator function
function* watcherSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
  yield takeEvery('FETCH_GENRES', fetchAllGenres);
}

// GET all movies from the DB
function* fetchAllMovies() {
  try {
    const movies = yield axios.get('/api/movie');
    console.log('GET from fetchAllMovies:', movies.data);
    yield put({ type: 'SET_MOVIES', payload: movies.data });
  } catch (err) {
    console.log('error in fetchAllMovies:', err);
  }
}

// GET all genres from the DB
function* fetchAllGenres() {
  try {
    const genres = yield axios.get('/api/genre');
    console.log('GET from fetchAllGenres:', genres.data);
    yield put({ type: 'SET_GENRES', payload: genres.data });
  } catch (err) {
    console.log('error in fetchAllGenres:', err);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Reducers -----------------

// Used to store movies returned from the server
const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
};

// Used to store the movie genres from the server
const genresReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
};

// Create store that all components can use
const storeInstance = createStore(
  combineReducers({
    moviesReducer,
    genresReducer,
  }),
  // Add sagaMiddleware and logger to our store
  applyMiddleware(sagaMiddleware, logger)
);

// Pass watcherSaga into our sagaMiddleware
sagaMiddleware.run(watcherSaga);

// Render to DOM
ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
