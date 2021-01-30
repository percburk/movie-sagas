import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardContent,
} from '@material-ui/core';

function MovieList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.moviesReducer);
  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);

  const handleClickPoster = (id) => {
    history.push(`/details/${id}`);
  };

  return (
    <Box display="flex" flexWrap="wrap">
      <button onClick={() => history.push('/add')}>Add a new movie!</button>
      {movies.map((item) => {
        return (
          <Box m={2} key={item.id}>
            <Card elevation={3}>
              <Box p={3}>
                <CardActionArea>
                  <img
                    src={item.poster}
                    alt={item.title}
                    onClick={() => handleClickPoster(item.id)}
                  />
                </CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    {item.title}
                  </Typography>
                  <Box display="flex" justifyContent="center">
                    { item.genre_group ??
                      item.genre_group.map((item, i) => <p key={i}>{item.name}</p>)
                      }
                  </Box>
                </CardContent>
              </Box>
            </Card>
          </Box>
        );
      })}
    </Box>
  );
}

export default MovieList;
