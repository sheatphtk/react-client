import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import { Typography } from '@mui/material';

export default function Table() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx = {{ p :2}}>
      <Paper sx = {{ p :2}}>
      <Box display = "flex">
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
        <Box sx={{ flexGrow: 1}}>
          <Typography variant = "h6" gutterBottom component = "div">
            Users
          </Typography>
        </Box>
        <Box>
          <Button variant = "contained">
            Create
          </Button>
        </Box>
        </Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
