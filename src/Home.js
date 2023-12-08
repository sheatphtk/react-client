import React,{useEffect,useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CallIcon from '@mui/icons-material/Call';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [cardsList,setCardList] = useState([]);
  
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
    fetch("http://localhost:3333/shopalldetail")
    .then(res => res.json())
    .then(
      (result) => {
        setCardList(result);
      },

     
    )
  }
  const ShopPreview = id => {
    window.location =  '/Shopdetail/'+id

  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const PageSelect = (index)=> {
    if(index === 0){
      window.location =  '/Shop'

    }
    if(index === 1){
      window.location =  '/Userlist'

    }
    if(index === 2){
      window.location = '/Banner'
    }
    if(index === 3){
      window.location = '/login'
    }

  };
  
  const defaultTheme = createTheme();


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx = {{ backgroundColor :'#ffffff'}}>
          <IconButton
            color="#000000"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
          variant="h6" 
          noWrap 
          align = "center"
          component= "div" 
          sx = {{color : '#000000'}}>
            Menu
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['SHOP', 'USER', 'BANNER', 'LOGOUT'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick= {()=>PageSelect(index)} >
                
                <ListItemIcon>
                  {index === 0 ?  <StorefrontIcon />:''}
                  {index === 1 ? <AccountCircleIcon /> :''}
                  {index === 2 ? <PhotoSizeSelectActualIcon/> : ''}
                  {index === 3 ? <LogoutIcon/> : ''}
                  
                 
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />

      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        
        
        <Box
        
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 15,
         
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <Grid container spacing={2}>
        <Grid md={4}>
            <img src="https://source.unsplash.com/9yO23tJcLMA" alt="" width="100%"></img>
        </Grid>
        <Grid md={4}> 
            <img src="https://source.unsplash.com/xXbagTDFoeU" alt="" width="100%"></img>
       
        </Grid>
        <Grid md={4}> 
            <img src="https://source.unsplash.com/mtxhbuf6IEo" alt="" width="100%"></img>
       
        </Grid>
        </Grid>
      </Box>
       <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              SHOP DETAIL
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            An online marketplace strategy that allows customers to leave reviews of a company’s entire store in order to further build trust and confidence.
        </Typography>
      <Box sx = {{ textAlign : 'center',fontWeight : 'bold'}}>
        
       

      </Box>
      <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
 
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 1,
          }}
        >

        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cardsList.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={`http://localhost:3333/public/Images/${card.banner_name}`}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                    {card.shop_name}
                    </Typography>
                    <Typography>
                    {card.address}
                    </Typography>
                   
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={()=> ShopPreview(card.shop_id)}>View</Button>
                    
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>

      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
         Contact Us
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
        
       </Typography>
       
       <Container maxWidth="lg" sx = {{ p :2}}>
       

       <Grid container spacing={2} sx = {{ p :5}} align = "center">
        <Grid md={4}>
        <CallIcon/>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
        02-673-9335
        </Typography>
        </Grid>
        
        <Grid md={4}>
        <LocationOnIcon/>
           
           <Typography
             variant="subtitle1"
             align="center"
             color="text.secondary"
             component="p"
           >
             Thai CC Tower, 270 27th Floor, 43 South Sathorn Road, Yannawa, Sathorn Bangkok, Thailand 10120
           
          </Typography>
              
        
        </Grid>
        <Grid md={4}> 
        <MailIcon/> 
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
            contact@feyverly.com
        </Typography>
           
           
       
        </Grid>
        </Grid>
        </Container>
       
          
      </Box>
      {/* End footer */}
    </ThemeProvider>
      


        
        
       
        
        
        <Typography paragraph>
        
  
        </Typography>
        <Typography paragraph>
         
        </Typography>
      </Main>
    </Box>
  );
}