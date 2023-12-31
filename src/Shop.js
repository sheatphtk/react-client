
import  React , {useState , useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';
import Navbar from './Navbar';





export default function User() {
 const [userList,setUserList] = useState([]);

  useEffect(() => {
    UserGet()
      const token = localStorage.getItem('token')
      fetch("http://localhost:3333/authen", {
        method: "POST", 
        headers: {
          'Authorization': 'Bearer '+token,
          "Content-Type": "application/json",
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
          
      })
      .catch((error)=>{
          console.error('Error:',error)
      })

  }, [])
  const UserGet = ()=> {
    fetch("http://localhost:3333/shop")
    .then(res => res.json())
    .then(
      (result) => {
        setUserList(result);
      },

     
    )
  }
  const ShopUpdate = id => {
    window.location =  '/UpdateShop/'+id

  }
  const ShopDelete = id => {
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

      fetch("http://localhost:3333/deleteshop", requestOptions)
        .then(response => response.json())
        .then(result => {
          if(result['status']==='success'){
            BannerDelete(id)
            //UserGet()
          }
          })
        .catch(error => console.log('error', error));
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

      fetch("http://localhost:3333/deletebannerByShopId", requestOptions)
        .then(response => response.json())
        .then(result => {
          alert(result['message'])
          if(result['status']==='success'){
            UserGet()
          }
          })
        .catch(error => console.log('error', error));
}
  

 
  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar/>
      <Container maxWidth="lg" sx = {{ p :2}}>
      <Paper sx = {{ p :2}}>
      <Box display = "flex">
       
        <Box sx={{ flexGrow: 1}}>
          <Typography variant = "h6" gutterBottom component = "div">
            Shop
          </Typography>
        </Box>
        <Box>
          <Link href = 'CreateShop'>
          <Button variant = "contained" sx = {{bgcolor: '#647498'}}>
            Create
          </Button>
          </Link>
        </Box>
        
        </Box>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Shop Name</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Latitude</TableCell>
            <TableCell align="right">Longtitude</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.shop_id}
              </TableCell>
              <TableCell align="right">{row.shop_name}</TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">{row.shop_lat}</TableCell>
              <TableCell align="right">{row.shop_lng}</TableCell>
              
              <TableCell align="right">                
              <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                    <Button onClick={()=> ShopUpdate(row.shop_id)}>Edit</Button>
                    <Button onClick={()=> ShopDelete(row.shop_id)}>Del</Button>
                </ButtonGroup></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
