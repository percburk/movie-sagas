import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, makeStyles, Chip, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}));

function AddMovie() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const genres = useSelector((state) => state.genresReducer);
  const [chipColors, setChipColors] = useState(genres.slice().fill(false));
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

  const handleGenreAddition = (id, index) => {
    setChipColors(chipColors.map((chip, i) => (i === index ? !chip : chip)));
    genresToAdd.indexOf(id) === -1
      ? setGenresToAdd([...genresToAdd, id])
      : setGenresToAdd(genresToAdd.filter((entry) => entry !== id));
  };

  console.log(chipColors);

  return (
    <>
      <Box className={classes.root} display="flex">
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
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>

      <Box className={classes.root}>
        {genres.map((entry, i) => {
          return (
            <Chip
              
              key={entry.id}
              label={entry.name}
              color={chipColors[i] ? 'primary' : 'default'}
              onClick={() => {
                handleGenreAddition(entry.id, i);
              }}
            />
          );
        })}
      </Box>
    </>
  );
}

export default AddMovie;
