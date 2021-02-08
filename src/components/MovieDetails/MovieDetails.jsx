import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  Grid,
  Box,
  Paper,
  Typography,
  Button,
  Fab,
  makeStyles,
} from '@material-ui/core';
import { ArrowBackIos, Add, Edit } from '@material-ui/icons';
import EditMovie from '../EditMovie/EditMovie';
import './MovieDetails.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1.5),
    },
  },
}));

function MovieDetails({ setDialogOpen }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.oneMovieReducer);
  const [editOpen, setEditOpen] = useState(false);
  const [editMovie, setEditMovie] = useState({
    id: null,
    title: '',
    poster: '',
    description: '',
  });
  const [editGenre, setEditGenre] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    dispatch({ type: 'FETCH_GENRES' });
    dispatch({ type: 'FETCH_ONE_MOVIE', payload: id });
  }, []);

  const handleBack = () => {
    history.push('/');
  };

  const handleEditOpen = () => {
    setEditOpen(true);
    setEditMovie({
      id: id,
      title: movie.title,
      poster: movie.poster,
      description: movie.description,
    });
    setEditGenre(movie.genre_id_array);
  };

  console.log(movie);

  return (
    <>
      <Box className="heading">
        <Box display="flex" p={5} alignItems="center">
          <Box flexGrow={1}>
            <Typography variant="h2">Now Playing</Typography>
          </Box>
          <Box>
            <Fab
              variant="extended"
              color="primary"
              onClick={() => setDialogOpen(true)}
            >
              <Add /> Add a new movie
            </Fab>
          </Box>
        </Box>
      </Box>
      <Box m={3}>
        <Grid container spacing={10}>
          <Grid item xs={4}>
            <Paper elevation={4}>
              <Box p={6} display="flex" justifyContent="center">
                <img className="imageDetails" src={movie.poster} />
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
                    movie.genre_group.map((genreEntry, i) => (
                      <Typography variant="h6" key={i}>
                        {genreEntry}
                      </Typography>
                    ))}
                </Box>
              </Box>
              <Box className={classes.root} display="flex">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBack}
                  startIcon={<ArrowBackIos />}
                >
                  Go back
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleEditOpen}
                  startIcon={<Edit />}
                >
                  Edit movie
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <EditMovie
        editOpen={editOpen}
        setEditOpen={setEditOpen}
        editMovie={editMovie}
        setEditMovie={setEditMovie}
        editGenre={editGenre}
        setEditGenre={setEditGenre}
        id={id}
      />
    </>
  );
}

export default MovieDetails;
