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
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

function EditMovie({
  editOpen,
  setEditOpen,
  editMovie,
  setEditMovie,
  editGenre,
  setEditGenre,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const genres = useSelector((state) => state.genresReducer);

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch({
      type: 'EDIT_MOVIE',
      payload: { ...editMovie, genreArray: editGenre },
    });
    setEditGenre([]);
    setEditMovie({ id: null, title: '', poster: '', description: '' });
    setEditOpen(false);
    history.push('/');
  };

  const handleTextChange = (key) => (event) => {
    setEditMovie({ ...editMovie, [key]: event.target.value });
  };

  const handleGenreAddition = (id) => {
    if (editGenre.indexOf(id) === -1) {
      setEditGenre([...editGenre, id]);
    } else {
      setEditGenre(editGenre.filter((entry) => entry !== id));
    }
  };

  const handleCancel = () => {
    setEditOpen(false);
    setEditGenre([]);
    setEditMovie({ title: '', poster: '', description: '' });
  };

  console.log(editMovie);
  console.log(editGenre);

  return (
    <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
      <Box p={3}>
        <DialogTitle align="center">Edit Movie</DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center">
            <Box width="50%" p={1}>
              <TextField
                fullWidth
                variant="outlined"
                label="Movie Title"
                onChange={handleTextChange('title')}
                value={editMovie.title}
              />
            </Box>
            <Box width="50%" p={1}>
              <TextField
                fullWidth
                variant="outlined"
                label="Poster Image Link"
                onChange={handleTextChange('poster')}
                value={editMovie.poster}
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
                value={editMovie.description}
                rows={10}
              />
            </Box>
            <Box className={classes.root} width="50%" p={1}>
              {editGenre &&
                genres.map((entry) => {
                  return (
                    <Chip
                      key={entry.id}
                      label={entry.name}
                      color={
                        editGenre.indexOf(entry.id) === -1
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
              color="secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </DialogActions>
        </Box>
      </Box>
    </Dialog>
  );
}

export default EditMovie;
