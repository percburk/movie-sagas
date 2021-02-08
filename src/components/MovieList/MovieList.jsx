import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css';
import {
  Box,
  Typography,
  Chip,
  makeStyles,
  Paper,
  Grid,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.2),
    },
  },
}));

function MovieList({ bodyRef }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const movies = useSelector((state) => state.moviesReducer);
  useEffect(() => dispatch({ type: 'FETCH_MOVIES' }), []);

  const handleClickPoster = (id) => {
    history.push(`/details/${id}`);
  };

  return (
    <Box
      ref={bodyRef}
      paddingTop={2}
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
    >
      {movies.map((item) => {
        return (
          <Box m={2} key={item.id}>
            <Paper elevation={4}>
              <Box width={220} height={450}>
                <Grid container direction="column" align="center" spacing={2}>
                  <Grid item>
                    <Box py={2}>
                      <img
                        className="image"
                        src={item.poster}
                        alt={item.title}
                        onClick={() => handleClickPoster(item.id)}
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box paddingTop={1}>
                      <Typography variant="body1">{item.title}</Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box className={classes.root}>
                      {item.genre_group.map((genreEntry, i) => (
                        <Chip
                          key={i}
                          label={genreEntry}
                          variant="outlined"
                          className={classes.chip}
                          size="small"
                        />
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Box>
        );
      })}
    </Box>
  );
}

export default MovieList;
