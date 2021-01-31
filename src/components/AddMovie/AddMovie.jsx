import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Button,
  makeStyles,
  Chip,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

function AddMovie({ dialogOpen, setDialogOpen }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const genres = useSelector((state) => state.genresReducer);
  const [genresToAdd, setGenresToAdd] = useState([]);
  const [movieToAdd, setMovieToAdd] = useState({
    title: '',
    poster: '',
    description: '',
  });

  useEffect(() => dispatch({ type: 'FETCH_GENRES' }), []);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: 'POST_NEW_MOVIE',
      payload: { ...movieToAdd, genreArray: genresToAdd },
    });
    setGenresToAdd([]);
    setMovieToAdd({ title: '', poster: '', description: '' });
    setDialogOpen(false);
  };

  const handleTextChange = (key) => (event) => {
    setMovieToAdd({ ...movieToAdd, [key]: event.target.value });
  };

  const handleGenreAddition = (id) => {
    genresToAdd.indexOf(id) === -1
      ? setGenresToAdd([...genresToAdd, id])
      : setGenresToAdd(genresToAdd.filter((entry) => entry !== id));
  };

  return (
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
      <DialogTitle align="center">Add a New Movie</DialogTitle>
      <DialogContent>
        <Box display="flex" justifyContent="center">
          <Box width="50%" p={1}>
            <TextField
              fullWidth
              variant="outlined"
              label="Movie Title"
              onChange={handleTextChange('title')}
              value={movieToAdd.title}
            />
          </Box>
          <Box width="50%" p={1}>
            <TextField
              fullWidth
              variant="outlined"
              label="Poster Image Link"
              onChange={handleTextChange('poster')}
              value={movieToAdd.poster}
            />
          </Box>
        </Box>
        <Box display="flex" justifyContent="center">
          <Box width="50%" p={1}>
            <TextField
              fullWidth
              variant="outlined"
              multiline
              label="Movie Description"
              onChange={handleTextChange('description')}
              value={movieToAdd.description}
              rows={10}
            />
          </Box>
          <Box className={classes.root} width="50%" p={1}>
            {genres.map((entry) => {
              return (
                <Chip
                  key={entry.id}
                  label={entry.name}
                  color={
                    genresToAdd.indexOf(entry.id) === -1 ? 'default' : 'primary'
                  }
                  onClick={() => handleGenreAddition(entry.id)}
                />
              );
            })}
          </Box>
        </Box>
      </DialogContent>
      <Box display="flex" justifyContent="center">
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default AddMovie;
