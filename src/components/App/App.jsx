import { HashRouter as Router, Route } from 'react-router-dom';
import { Container, Typography, Box } from '@material-ui/core';
import './App.css';
import MovieList from '../MovieList/MovieList';
import MovieDetails from '../MovieDetails/MovieDetails';
import AddMovie from '../AddMovie/AddMovie';

function App() {
  return (
    <Container maxWidth="lg">
      <Box >
        <Typography variant="h3">Now Playing</Typography>
      </Box>
      <Router>
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route path="/details/:id">
          <MovieDetails />
        </Route>
        <Route path="/add">
          <AddMovie />
        </Route>
      </Router>
    </Container>
  );
}

export default App;
