import { Typography, Box, Fab } from '@material-ui/core';
import { Add, ArrowDownward } from '@material-ui/icons';
import './Heading.css';
import { useRef } from 'react';

function Heading({ setDialogOpen, handleClickToBody }) {
  return (
    <Box height="100vh" className="heading" marginBottom={2}>
      <Box display="flex" p={5} height="70vh">
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
      <Box display="flex" p={5} height="10vh" justifyContent="flex-end">
        <Fab onClick={handleClickToBody}>
          <ArrowDownward />
        </Fab>
      </Box>
    </Box>
  );
}

export default Heading;
