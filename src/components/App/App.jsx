import { HashRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';
import MovieList from '../MovieList/MovieList';
import MovieDetails from '../MovieDetails/MovieDetails';
import AddMovie from '../AddMovie/AddMovie';
import Heading from '../Heading/Heading';

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      <Router>
        <Route path="/" exact>
          <Heading setDialogOpen={setDialogOpen} />
          <MovieList />
        </Route>
        <Route path="/details/:id">
          <MovieDetails />
        </Route>
        <AddMovie dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
      </Router>
    </>
  );
}

export default App;
