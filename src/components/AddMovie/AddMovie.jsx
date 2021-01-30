import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, makeStyles, Chip, Box } from '@material-ui/core';

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

function AddMovie() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const genres = useSelector((state) => state.genresReducer);
  // const [chipColors, setChipColors] = useState(genres.split()
  const [genresToAdd, setGenresToAdd] = useState([]);
  const [movieToAdd, setMovieToAdd] = useState({
    title: '',
    poster: '',
    description: '',
  });

  const primary = "primary";

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
    genresToAdd.indexOf(id) === -1
      ? setGenresToAdd([...genresToAdd, id])
      : setGenresToAdd(genresToAdd.filter((entry) => entry !== id));
  };

  //      setIsChecked(isChecked.map((check, i) => (i === index ? !check : check)));
  //   if (genresToAdd.indexOf(id) === -1) {
  //     setGenresToAdd([...genresToAdd, id]);
  //   } else {
  //     setGenresToAdd(genresToAdd.filter((item) => item !== id));
  //   }
  // };

  console.log(genresToAdd);

  return (
    <>
      <Box className={classes.root}>
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
      </Box>
      <Box className={classes.root}>
        {genres.map((entry, i) => {
          return (
            <Chip
              key={entry.id}
              label={entry.name}
              variant="outlined"
              color="primary"
              onClick={() => {
                handleGenreAddition(entry.id, i);
              }}
            />
          );
        })}
      </Box>
      <Button variant="outlined" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
}

export default AddMovie;
