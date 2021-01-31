import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Grid, Box, Paper, Typography, Button } from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';

function MovieDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.oneMovieReducer);
  let { id } = useParams();
  useEffect(() => dispatch({ type: 'FETCH_ONE_MOVIE', payload: id }), []);

  const handleBack = () => {
    history.push('/');
  };

  return (
    <Box m={3}>
      <Grid container spacing={10}>
        <Grid item xs={4}>
          <Paper elevation={4}>
            <Box p={6} display="flex" justifyContent="center">
              <img style={{ height: '400px' }} src={movie.poster} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Box>
            <Box paddingBottom={3}>
              <Typography variant="h4">{movie.title}</Typography>
            </Box>
            <Box paddingBottom={3}>
              <Typography variant="body1">{movie.description}</Typography>
            </Box>
            <Box paddingBottom={3}>
              <Typography variant="h5" gutterBottom>
                Genres
              </Typography>
              <Box py={1}>
                {movie.genre_group &&
                  movie.genre_group.map((item, i) => (
                    <Typography variant="h6" key={i}>
                      {item}
                    </Typography>
                  ))}
              </Box>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBack}
              startIcon={<ArrowBackIos />}
            >
              Go back
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MovieDetails;
