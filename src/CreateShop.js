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
import Navbar from './Navbar';

export default function UserCreate() {
    const handleSubmit = event =>{
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "shopname" : shopname,
            "shopaddress" : shopaddress,
            "shoplat" : shoplat,
            "shoplng" : shoplng,
       
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:3333/createshop", requestOptions)
        .then(response => response.json())
        .then(result => {
            alert(result['status'])
            if(result['status'] === 'success'){
                window.location.href = '/Shop'
            }else{
                window.location.href = '/Shop'
            }

        })
        .catch(error => console.log('error', error));
     }
            const [shopname,setshopname] = useState(''); //ค่า default
            const [shopaddress,setshopaddress] = useState('');
            const [shoplat,setshoplat] = useState('');
            const [shoplng,setshoplng] = useState('');
            

  return ( 
    <React.Fragment>
      <CssBaseline />
      <Navbar/>
      <Container maxWidth="sm" sx = {{ p :2}}>
      <Paper sx = {{ p :2}}>
   
          <Typography variant = "h6" gutterBottom component = "div">
           Create Shop
          </Typography>
        <form onSubmit = {handleSubmit}>
            <Grid Container spacing = {2}>
            <Grid item xs = {12} sx = {{p :1}}>
            <TextField id="shopname" label="Shop Name" variant="outlined" fullWidth required 
            onChange = {(e)=> setshopname(e.target.value)} //ถ้ามี event เกิดขึ้นให้ setfname
            />
            </Grid>
            <Grid item xs = {12} sx = {{p :1}} >
            <TextField id="shopaddress" label="Shop Address" variant="outlined" fullWidth required
            onChange = {(e)=> setshopaddress(e.target.value)}
            
            />
            </Grid>
            <Grid item xs = {12} sx = {{p :1}} >
            <TextField id="shoplat" label="latitude" variant="outlined" fullWidth required
            onChange = {(e)=> setshoplat(e.target.value)}
            />
            </Grid>
           
            <Grid item xs = {12} sx = {{p :1}} >
            <TextField id="shoplng"  label="longitude" variant="outlined" fullWidth required
            onChange = {(e)=> setshoplng(e.target.value)}
            />
            </Grid>
   
            <Grid item xs = {12} sx = {{p :1}} >
            <Button type = "submit" variant = "contained" sx = {{bgcolor: '#647498'}} fullWidth required>
                    Create
            </Button>
            </Grid>
            </Grid>
        </form>
    
   
        </Paper>
      </Container>
    </React.Fragment>
  );
}
