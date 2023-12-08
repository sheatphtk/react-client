import React , {useState,useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useParams } from 'react-router-dom';
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

export default function UserUpdate() {
    const {id} = useParams();
    useEffect(()=>{
            const token = localStorage.getItem('token')
            fetch("http://localhost:3333/authen", {
              method: "POST", 
              headers: {
                
                "Content-Type": "application/json",
                'Authorization': 'Bearer '+token
              },
             
            })
            .then(response=> response.json())
            .then(data=> {
                if(data.status === 'ok'){
                  
                }else {
                    alert('authen failed');
                    localStorage.removeItem('token');
                    window.location = '/login'//redirect

                }
                console.log('Success:',data);
            })
            .catch((error)=>{
                console.error('Error:',error)
            })
        

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("http://localhost:3333/getuserbyid/"+id, requestOptions)
            .then(response => response.json())
            .then(result => {
                
                if(result['status']==='success'){
                    setfname(result['user'][0]['fname'])
                    setlname(result['user'][0]['lname'])
                    setemail(result['user'][0]['email'])
                    settype(result['user'][0]['type'])
                    setpassword(result['user'][0]['password'])

                }else{
                    setfname(result['user']['fname'])
                    setlname(result['user']['lname'])
                    setemail(result['user']['email'])
                    settype(result['user']['type'])

                }
            })
   
            .catch(error => console.log('error', error));
    },[id])
    const handleSubmit = event =>{
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "id":id,
        "email": email,
        "fname": fname,
        "lname": lname,
        "type": type
        });

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:3333/updateUser", requestOptions)
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
      <Container maxWidth="sm" sx = {{ p :2}}>
      <Paper sx = {{ p :2}}>
    
   
          <Typography variant = "h6" gutterBottom component = "div">
           Update User
          </Typography>
        <form onSubmit = {handleSubmit}>
            <Grid Container spacing = {2}>
            <Grid item xs = {12} sx = {{p :1}}>
            <TextField id="fname"  variant="outlined" fullWidth required 
            onChange = {(e)=> setfname(e.target.value)}  value = {fname}//ถ้ามี event เกิดขึ้นให้ setfname
            />
            </Grid>
            <Grid item xs = {12} sx = {{p :1}} >
            <TextField id="lname"  variant="outlined" fullWidth required
            onChange = {(e)=> setlname(e.target.value)} value = {lname}
            
            />
            </Grid>
            <Grid item xs = {12} sx = {{p :1}} >
            <TextField id="email"  variant="outlined" fullWidth required
            onChange = {(e)=> setemail(e.target.value)} value = {email}
            />
            </Grid>
            <Grid item xs = {12} sx = {{p :1}} >
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
             
                label="Type"
               
                onChange = {(e)=> settype(e.target.value)} value = {type} >
                      
                <MenuItem value={'Admin'} selected>Admin</MenuItem>
                <MenuItem value={'User'}>User</MenuItem>
                </Select>
            </FormControl>
            </Grid>
      
   
            <Grid item xs = {12} sx = {{p :1}} >
            <Button type = "submit" variant = "contained" sx = {{bgcolor: '#647498'}} fullWidth required>
                    Update
            </Button>
            </Grid>
            </Grid>
        </form>
    
   
        </Paper>
      </Container>
    </React.Fragment>
  );
}
