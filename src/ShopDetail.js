
import  React , {useState , useEffect} from 'react';
import { useParams } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './Navbar';
import MapContainer from './MapContainer';

export default function Shopdetail() {
  const {id} = useParams();
  
  const [shopname,setShopName] = useState('');
  const [shopaddress,setShopAddress] = useState('');
  const [shoplat,setShopLat] = useState('');
  const [shoplng,setShopLng] = useState('');
  const [bannername,setBannerName] = useState('');
  const MapData = {
    shoplat: shoplat,
    shoplng: shoplng
   
  };
  
  

  

  

  //ค่า default

  useEffect(()=>{
      var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch("http://localhost:3333/getShopdetailbyid/"+id, requestOptions)
          .then(response => response.json())
          .then(result => {
              
              if(result['status']==='success'){
                  setShopName(result['user'][0]['shop_name'])
                  setShopAddress(result['user'][0]['address'])
                  setShopLat(result['user'][0]['shop_lat'])
                  setShopLng(result['user'][0]['shop_lng'])
                  setBannerName(result['user'][0]['banner_name'])
                  setShopLat(result['user'][0]['shop_lat'])
                  setShopLng(result['user'][0]['shop_lng'])
                  
                  
                  
                  
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
           <Typography variant = "h1" gutterBottom component = "div">
            {shopname}
           </Typography>
         </Box>
         <Box>

         </Box>
         
         </Box>
         <Box sx={{ flexGrow: 1}}>
            <Typography variant = "h6" gutterBottom component = "div">
            {shopaddress}
           </Typography>
            </Box>

            <MapContainer 
            latData = {MapData.shoplat}
            lngData = {MapData.shoplng}
            />

          </Paper>
        </Container>
      </React.Fragment>
    );
    };
 
  

 





