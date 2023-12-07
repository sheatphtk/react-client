import React , {useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import UploadImage from './UploadImage';
import Navbar from './Navbar';

export default function CreateBanner() {
   

  return ( 
    <React.Fragment>
      <CssBaseline />
      <Navbar/>
      
      
      <Container maxWidth="sm" sx = {{ p :2}}>
      <Paper sx = {{ p :2}}>
   
          <Typography variant = "h6" gutterBottom component = "div">
           Upload Banner
          </Typography>
          <UploadImage />
        
    
   
        </Paper>
      </Container>
    </React.Fragment>
  );
}
