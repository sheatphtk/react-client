import  React , {useState , useEffect} from 'react';
import { useParams } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './Navbar';
import UpdateUploadImage from './UpdateUploadImage';


export default function Shopdetail() {
  const {id} = useParams();
  
  const [bannername,setBannerName] = useState('');
  const [bannershopid,setBannerShopId] = useState('');
  

  
  

  

  

  //ค่า default

  useEffect(()=>{
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
    
      var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch("http://localhost:3333/getBannerdetailbyid/"+id, requestOptions)
          .then(response => response.json())
          .then(result => {
              
              if(result['status']==='success'){
                setBannerName(result['user'][0]['banner_name'])
                setBannerShopId(result['user'][0]['banner_shop_id'])
                  
                  
                  
                  
                  
              }else{
                 
              }
          })
 
          .catch(error => console.log('error', error));
  },[id])
 
   
    return (
      <React.Fragment>
        <CssBaseline />
        <Navbar/>
        <Container maxWidth="md" sx = {{ p :2}}>
        <Paper sx = {{ p :2}}>
        <img src = {`http://localhost:3333/public/Images/${bannername}`} alt="" width="100%"></img>
        <Box display = "flex">
         
         <Box sx={{ flexGrow: 1}}>
           <Typography variant = "h6" gutterBottom component = "div">
           {`BANNER NAME : ${bannername}`}
            
           </Typography>
         </Box>
         <Box>

         </Box>
         
         </Box>
         <Box sx={{ flexGrow: 1}}>
            <Typography variant = "h6" gutterBottom component = "div">
            {bannershopid}
           </Typography>
            </Box>
            <UpdateUploadImage
            id = {id}
            shop_id = {bannershopid}
            />

       

          </Paper>
        </Container>
      </React.Fragment>
    );
    };
 
  

 





