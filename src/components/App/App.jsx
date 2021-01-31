import { HashRouter as Router, Route } from 'react-router-dom';
import { useState, useRef } from 'react';
import MovieList from '../MovieList/MovieList';
import MovieDetails from '../MovieDetails/MovieDetails';
import AddMovie from '../AddMovie/AddMovie';
import Heading from '../Heading/Heading';
import './App.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const bodyRef = useRef();

  const handleClickToBody = () => {
    bodyRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Route path="/" exact>
          <Heading
            setDialogOpen={setDialogOpen}
            handleClickToBody={handleClickToBody}
          />
          <MovieList bodyRef={bodyRef} />
        </Route>
        <Route path="/details/:id">
          <MovieDetails setDialogOpen={setDialogOpen} />
        </Route>
        <AddMovie dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
