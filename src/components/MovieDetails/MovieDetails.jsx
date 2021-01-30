import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function MovieDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movieReducer);
  let { id } = useParams();
  useEffect(() => dispatch({ type: 'FETCH_ONE_MOVIE', payload: id }), []);

  const handleBack = () => {
    history.push('/');
  };

  return (
    <>
      <p>In MovieDetails!</p>
      <p>{movie.title}</p>
      <img src={movie.poster} />
      <p>{movie.description}</p>
      {movie.genre_group &&
        movie.genre_group.map((item, i) => <p key={i}>{item}</p>)}
      <button onClick={handleBack}>Go back</button>
    </>
  );
}

export default MovieDetails;
