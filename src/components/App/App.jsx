import { HashRouter as Router, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import './App.css';
import MovieList from '../MovieList/MovieList';
import MovieDetails from '../MovieDetails/MovieDetails';
import AddMovie from '../AddMovie/AddMovie';

function App() {
  return (
    <Container className="App" maxWidth="lg">
      <h1>The Movies Saga!</h1>
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
