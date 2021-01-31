import { Typography, Box, Fab } from '@material-ui/core';
import { Theaters } from '@material-ui/icons';
import { Add } from '@material-ui/icons';
import './Heading.css';

function Heading({ setDialogOpen }) {
  return (
    <Box height="90vh" className="heading" marginBottom={2}>
      <Box display="flex" p={3}>
        <Box flexGrow={1}>
          <Typography variant="h3" color="secondary">
            Now Playing
          </Typography>
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
    </Box>
  );
}

export default Heading;
