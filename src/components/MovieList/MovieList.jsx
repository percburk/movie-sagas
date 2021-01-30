import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import './MovieList.css';

function MovieList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.moviesReducer);

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);

  const handleClickPoster = () => {
    
  }

  return (
    <main>
      <h1>MovieList</h1>
      <button onClick={() => history.push('/add')}>Add a new movie!</button>
      <section className="movies">
        {movies.map((movie) => {
          return (
            <div key={movie.id}>
              <h3>{movie.title}</h3>
              <img src={movie.poster} alt={movie.title} onClick={handleClickPoster}/>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default MovieList;
