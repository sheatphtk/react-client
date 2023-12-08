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
          
          fetch("http://localhost:3333/getshopbyid/"+id, requestOptions)
            .then(response => response.json())
            .then(result => {
                
                if(result['status']==='success'){
                   /* const [shopname,setshopname] = useState(''); //ค่า default
                    const [shopaddress,setshopaddress] = useState('');
                    const [shoplat,setshoplat] = useState('');
                    const [shoplng,setshoplng] = useState(''); */
                    setshopname(result['user'][0]['shop_name'])
                    setshopaddress(result['user'][0]['address'])
                    setshoplat(result['user'][0]['shop_lat'])
                    setshoplng(result['user'][0]['shop_lng'])
                    

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
        "shop_name": shopname,
        "shop_address": shopaddress,
        "shop_lat": shoplat,
        "shop_lng": shoplng
        });

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:3333/updateShop", requestOptions)
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
      <Container maxWidth="sm" sx = {{ p :2}}>
      <Paper sx = {{ p :2}}>
    
   
          <Typography variant = "h6" gutterBottom component = "div">
           Update Shop
          </Typography>
        <form onSubmit = {handleSubmit}>
        <Grid Container spacing = {2}>
            <Grid item xs = {12} sx = {{p :1}}>
            <TextField id="shopname" label="" variant="outlined" fullWidth required 
            onChange = {(e)=> setshopname(e.target.value)}  value = {shopname}//ถ้ามี event เกิดขึ้นให้ setfname
            />
            </Grid>
            <Grid item xs = {12} sx = {{p :1}} >
            <TextField id="shopaddress" label="" variant="outlined" fullWidth required
            onChange = {(e)=> setshopaddress(e.target.value)}  value = {shopaddress}
            
            />
            </Grid>
            <Grid item xs = {12} sx = {{p :1}} >
            <TextField id="shoplat" label="" variant="outlined" fullWidth required
            onChange = {(e)=> setshoplat(e.target.value)}  value = {shoplat}
            />
            </Grid>
           
            <Grid item xs = {12} sx = {{p :1}} >
            <TextField id="shoplng"  label="" variant="outlined" fullWidth required
            onChange = {(e)=> setshoplng(e.target.value)}  value = {shoplng}
            />
            </Grid>
   
            <Grid item xs = {12} sx = {{p :1}} >
            <Button type = "submit" variant = "" sx = {{bgcolor: '#647498',color: '#ffffff'}} fullWidth required>
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
