import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  MenuItem,
  Button,
  makeStyles,
  useTheme,
  FormControl,
  Select,
  Chip,
  InputLabel,
  Input,
  Box
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}));

const getStyles = (genre, genresToAdd, theme) => {
  return {
    fontWeight:
      genresToAdd.indexOf(genre) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function AddMovie() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
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
  };

  const handleTextChange = (key) => (event) => {
    setMovieToAdd({ ...movieToAdd, [key]: event.target.value });
  };

  const handleGenreAddition = (event) => {
    setGenresToAdd(event.target.value);
  };

  console.log(genresToAdd);

  return (
    <>
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
          label="Movie Description"
          onChange={handleTextChange('description')}
          value={movieToAdd.description}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="genreLabel">Genres</InputLabel>
          <Select
            labelId="genreLabel"
            multiple
            value={genresToAdd}
            onChange={handleGenreAddition}
            input={<Input id="genreInput" />}
            renderValue={(selected) => {
              <Box className={classes.chips}>
                {selected.map((value) => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </Box>;
            }}
            MenuProps={MenuProps}
          >
            {genres.map((entry) => (
              <MenuItem
                key={entry.id}
                value={entry}
                style={getStyles(entry, genresToAdd, theme)}
              >
                {entry.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="outlined" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
}

export default AddMovie;
