import React , {useState,useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import Container from '@mui/material/Container';

import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

import UploadImage from './UploadImage';
import Navbar from './Navbar';

export default function CreateBanner() {
  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch("http://localhost:3333/authen", {
      method: "POST", 
      headers: {
        
        "Content-Type": "application/json",
        "Authorization": 'Bearer '+token
      },
     
    })
    .then(response=> response.json())
    .then(data=> {
      alert(data.status);
        if(data.status === 'ok'){
          //alert('authen success')

        }else {
            alert('authen failed');
            localStorage.removeItem('token');
            window.location = '/Login'//redirect
        }
        console.log('Success:',data);
    })
    .catch((error)=>{
        console.error('Error:',error)
    })


 
     
  }, [])
  
   

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
