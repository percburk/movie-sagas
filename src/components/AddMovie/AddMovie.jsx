import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Menu,
  MenuItem,
  Button,
  makeStyles,
  Checkbox,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function AddMovie() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const genres = useSelector((state) => state.genresReducer);
  const [isChecked, setIsChecked] = useState(genres.slice().fill(false));
  const [anchorEl, setAnchorEl] = useState(null);
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
  };

  const handleTextChange = (key) => (event) => {
    setMovieToAdd({ ...movieToAdd, [key]: event.target.value });
  };

  const handleGenreMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const toggleCheckedGenre = (index, id) => {
    setIsChecked(isChecked.map((check, i) => (i === index ? !check : check)));
    if (genresToAdd.indexOf(id) === -1) {
      setGenresToAdd([...genresToAdd, id]);
    } else {
      setGenresToAdd(genresToAdd.filter((item) => item !== id));
    }
  };

  console.log(genresToAdd);

  return (
    <>
      <p>In AddMovies!</p>
      <form className={classes.root} onSubmit={handleSubmit} autoComplete="off">
        <TextField
          variant="outlined"
          label="Movie Title"
          onChange={handleTextChange('title')}
          value={movieToAdd.title}
        />
        <TextField
          variant="outlined"
          label="Poster Image Link"
          onChange={handleTextChange('poster')}
          value={movieToAdd.poster}
        />
        <TextField
          variant="outlined"
          multiline
          rows={4}
          label="Movie Description"
          onChange={handleTextChange('description')}
          value={movieToAdd.description}
        />
        <Button variant="outlined" onClick={handleGenreMenu}>
          Select Genres
        </Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          {genres.map((genreItem, i) => {
            return (
              <MenuItem key={genreItem.id}>
                <Checkbox
                  key={i}
                  checked={isChecked[i]}
                  onClick={() => toggleCheckedGenre(i, genreItem.id)}
                />
                {genreItem.name}
              </MenuItem>
            );
          })}
        </Menu>
        <Button variant="outlined" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
}

export default AddMovie;
