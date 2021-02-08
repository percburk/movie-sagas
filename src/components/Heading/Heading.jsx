import { Typography, Box, Fab } from '@material-ui/core';
import { Add, ArrowDownward } from '@material-ui/icons';
import './Heading.css';

function Heading({ setDialogOpen, handleClickToBody }) {
  return (
    <Box height="100vh" className="heading" marginBottom={2}>
      <Box display="flex" p={5} height="80vh">
        <Box flexGrow={1}>
          <Typography variant="h2">Now Playing</Typography>
        </Box>
        <Box>
          <Fab
            variant="extended"
            color="primary"
            onClick={() => setDialogOpen(true)}
          >
            <Add />
            Add a new movie
          </Fab>
        </Box>
      </Box>
      <Box
        display="flex"
        p={5}
        height="10vh"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Box flexGrow={1}>
          <Typography variant="body1">2001: A Space Odyssey</Typography>
        </Box>
        <Box>
          <Fab onClick={handleClickToBody} color="primary">
            <ArrowDownward />
          </Fab>
        </Box>
      </Box>
    </Box>
  );
}

export default Heading;
