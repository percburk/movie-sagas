import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
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
  yield takeEvery('FETCH_ONE_MOVIE', fetchOneMovie);
  yield takeEvery('POST_NEW_MOVIE', postNewMovie);
  yield takeEvery('EDIT_MOVIE', editMovie);
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

// GET one movie from DB for MovieDetails
function* fetchOneMovie(action) {
  const id = action.payload;
  try {
    const movie = yield axios.get(`/api/movie/${id}`);
    console.log('GET from fetchOneMovie', movie);
    yield put({ type: 'SET_MOVIE_FOR_DETAILS', payload: movie.data[0] });
  } catch (err) {
    console.log('error in fetchOneMovie', err);
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

// POST new movie to the DB
function* postNewMovie(action) {
  const newMovie = action.payload;
  try {
    yield axios.post('/api/movie', newMovie);
    yield put({ type: 'FETCH_MOVIES' });
  } catch (err) {
    console.log('error in postNewMovie', err);
  }
}

// PUT route to edit movie
function* editMovie(action) {
  const movieEdited = action.payload;
  try {
    yield axios.put(`/api/movie/edit/${movieEdited.id}`, movieEdited);
    yield put({ type: 'FETCH_ONE_MOVIE', payload: movieEdited.id });
  } catch (err) {
    console.log('error in editMovie', err);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Reducers -----------------

// Used to store all the movies returned from the server
const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
};

// Used to store the one movie shown on MovieDetails
const oneMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_MOVIE_FOR_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

// Used to store all the movie genres from the server
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
    oneMovieReducer,
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
