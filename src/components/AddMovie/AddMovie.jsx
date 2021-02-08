import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
  Collapse,
  IconButton,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Close } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

function AddMovie({ dialogOpen, setDialogOpen }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const genres = useSelector((state) => state.genresReducer);
  const [alertOpen, setAlertOpen] = useState(false);
  const [genresToAdd, setGenresToAdd] = useState([]);
  const [movieToAdd, setMovieToAdd] = useState({
    title: '',
    poster: '',
    description: '',
  });

  const handleSubmit = () => {
    if (
      movieToAdd.title &&
      movieToAdd.poster &&
      movieToAdd.description &&
      genresToAdd[0]
    ) {
      dispatch({
        type: 'POST_NEW_MOVIE',
        payload: { ...movieToAdd, genreArray: genresToAdd },
      });
      setGenresToAdd([]);
      setMovieToAdd({ title: '', poster: '', description: '' });
      setDialogOpen(false);
      history.push('/');
    } else {
      setAlertOpen(true);
    }
  };

  const handleTextChange = (key) => (event) => {
    setMovieToAdd({ ...movieToAdd, [key]: event.target.value });
  };

  const handleGenreAddition = (id) => {
    if (genresToAdd.indexOf(id) === -1) {
      setGenresToAdd([...genresToAdd, id]);
    } else {
      setGenresToAdd(genresToAdd.filter((entry) => entry !== id));
    }
  };

  return (
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
      <Box p={3}>
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
                      genresToAdd.indexOf(entry.id) === -1
                        ? 'default'
                        : 'primary'
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
              color="error"
              onClick={() => {
                setDialogOpen(false);
                setAlertOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </DialogActions>
        </Box>
      </Box>
      <Collapse in={alertOpen}>
        <Alert
          severity="error"
          action={
            <IconButton
              color="inherit"
              size="small"
              onClick={() => setAlertOpen(false)}
            >
              <Close />
            </IconButton>
          }
        >
          Please fill out all fields!
        </Alert>
      </Collapse>
    </Dialog>
  );
}

export default AddMovie;
