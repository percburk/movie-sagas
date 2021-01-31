import { HashRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';
import { Container, Typography, Box, Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import './App.css';
import MovieList from '../MovieList/MovieList';
import MovieDetails from '../MovieDetails/MovieDetails';
import AddMovie from '../AddMovie/AddMovie';

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <Container maxWidth="lg">
      <Box display="flex" alignItems="center" p={3}>
        <Box flexGrow={1}>
          <Typography variant="h3">Now Playing</Typography>
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
      <Router>
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route path="/details/:id">
          <MovieDetails />
        </Route>
        <AddMovie dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
      </Router>
    </Container>
  );
}

export default App;
