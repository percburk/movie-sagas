import { HashRouter as Router, Route } from 'react-router-dom';
import { useState, useRef } from 'react';
import MovieList from '../MovieList/MovieList';
import MovieDetails from '../MovieDetails/MovieDetails';
import AddMovie from '../AddMovie/AddMovie';
import Heading from '../Heading/Heading';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

// fonts imported from Google Fonts:
// Anonymous Pro: 400, 700 (monospace)
// Open Sans: 300, 400, 600 (sans serif)

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#f44336',
    },
    secondary: {
      main: '#3f51b5',
    },
  },
  typography: {
    fontFamily: 'Open Sans',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 400,
    fontWeightBold: 700,
    h2: {
      fontFamily: 'Anonymous Pro',
      fontWeight: 400,
      letterSpacing: '0.1em',
      lineHeight: 1,
    },
    h4: {
      fontFamily: 'Anonymous Pro',
      fontWeight: 400,
      letterSpacing: '0.1em',
    },
    h5: {
      fontFamily: 'Anonymous Pro',
      fontWeight: 400,
      letterSpacing: '0.1em',
    },
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
