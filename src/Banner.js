
import  React , {useState , useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

import Link from '@mui/material/Link';
import Navbar from './Navbar';
import {

  Card,
  CardMedia,
  Grid,
  CardContent
  
} from '@mui/material';




export default function Banner() {
 const [bannerList,setBannerList] = useState([]);
 

  useEffect(() => {
      BannerGet()
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
  const BannerGet = ()=> {
    fetch("http://localhost:3333/banner")
    .then(res => res.json())
    .then(
      (result) => {
        setBannerList(result);
      },

     
    )
  }

  
  
  const BannerUpdate = id => {
    window.location =  '/BannerUpdate/'+id

  }
  const BannerDelete = id => {
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "id": id
      });

      var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://localhost:3333/deletebanner", requestOptions)
        .then(response => response.json())
        .then(result => {
          
          if(result['status']==='success'){
           BannerGet()
          }
          })
        .catch(error => console.log('error', error));
  }
  

 
  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar/>
      <Container maxWidth="md" sx = {{ p :2}}>
      <Paper sx = {{ p :2}}>
      <Box display = "flex">
       
       <Box sx={{ flexGrow: 1}}>
         <Typography variant = "h6" gutterBottom component = "div">
           Banner
         </Typography>
       </Box>
       <Box>
         <Link href = 'CreateBanner'>
         <Button variant = "contained" sx = {{bgcolor: '#647498'}}>
           Create
         </Button>
         </Link>
       </Box>
       </Box>
      <Grid container spacing={2}>
 

      {bannerList.map((item) => (
        <Grid item key={item.banner_id} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardMedia
            component="div"
            sx={{
              // 16:9
              pt: '56.25%',
            }}
            
              alt={item.banner_name}
              height="140"
              
              image = {`http://localhost:3333/public/Images/${item.banner_name}`}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {item.banner_name}
              </Typography>
              <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                    <Button onClick={()=> BannerUpdate(item.banner_id)}>Edit</Button>
                    <Button onClick={()=> BannerDelete(item.banner_id)}>Del</Button>
                </ButtonGroup>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
