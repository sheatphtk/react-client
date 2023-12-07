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
        "email": email,
        "password":password,
        "fname": fname,
        "lname": lname,
        "type": type
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:3333/createuser", requestOptions)
        .then(response => response.json())
        .then(result => {
            alert(result['status'])
            if(result['status'] === 'success'){
                window.location.href = '/Userlist'
            }else{
                window.location.href = '/Userlist'
            }

        })
        .catch(error => console.log('error', error));
            }
            const [fname,setfname] = useState(''); //ค่า default
            const [lname,setlname] = useState('');
            const [email,setemail] = useState('');
            const [type,settype] = useState('');
            const [password,setpassword] = useState('');

  return ( 
    <React.Fragment>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="sm" sx = {{ p :2}}>
      <Paper sx = {{ p :2}}>
   
          <Typography variant = "h6" gutterBottom component = "div">
           Create User
          </Typography>
        <form onSubmit = {handleSubmit}>
            <Grid Container spacing = {2}>
            <Grid item xs = {12} sx = {{p :1}}>
            <TextField id="fname" label="first name" variant="outlined" fullWidth required 
            onChange = {(e)=> setfname(e.target.value)} //ถ้ามี event เกิดขึ้นให้ setfname
            />
            </Grid>
            <Grid item xs = {12} sx = {{p :1}} >
            <TextField id="lname" label="last name" variant="outlined" fullWidth required
            onChange = {(e)=> setlname(e.target.value)}
            
            />
            </Grid>
            <Grid item xs = {12} sx = {{p :1}} >
            <TextField id="email" label="email" variant="outlined" fullWidth required
            onChange = {(e)=> setemail(e.target.value)}
            />
            </Grid>
            <Grid item xs = {12} sx = {{p :1}} >
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
             
                label="Type"
               
                onChange = {(e)=> settype(e.target.value)} >
                <MenuItem value={'Admin'}>Admin</MenuItem>
                <MenuItem value={'User'}>User</MenuItem>
                </Select>
            </FormControl>
            </Grid>
            <Grid item xs = {12} sx = {{p :1}} >
            <TextField id="password" type = "password" label="password" variant="outlined" fullWidth required
            onChange = {(e)=> setpassword(e.target.value)}
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
