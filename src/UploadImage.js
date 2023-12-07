// MultiFormUploadMaterialUI.js
import React, { useState,useEffect } from 'react';
import {

  Button,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardMedia,
  Typography,
} from '@mui/material';
import axios from 'axios';

const MultiFormUploadMaterialUI = () => {
    const [shopList,setShopList] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    useEffect(() => {
        UserGet()
           
         
      }, [])
      const UserGet = ()=> {
        fetch("http://localhost:3333/selectshop")
        .then(res => res.json())
        .then(
          (result) => {
            setShopList(result);
          },
    
         
        )
      }

  const [formData, setFormData] = useState({ //form default value
    selectedOption: '',
    file: null,
  });

  const [uploadedImage, setUploadedImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('selectedOption', selectedValue);
    data.append('file', formData.file);

    try {
      const response = await axios.post('http://localhost:3333/insertimg', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Assuming the response contains the URL of the uploaded image
      setUploadedImage(response.data.imageUrl);
      if(response){
        alert("image upload success")
        window.location = '/Banner';
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <form onSubmit={handleSubmit}>



           
          

        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="selectedOptionLabel">Select Shop</InputLabel>
          <Select
            labelId="selectedOptionLabel"
            id="selectedOption"
            name="selectedOption"
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
            label="Select Option"
          >
            {shopList.map((row) => (
            

            
            <MenuItem key = {row.shop_id} value={row.shop_id}>{row.shop_name}</MenuItem>
            ))}
          </Select>

          
        </FormControl>

        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="file"
          name="file"
          type="file"
          onChange={handleChange}
        />
        <label htmlFor="file">
          <Button variant="contained" component="span">
            Upload Image
          </Button>
        </label>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </form>

      {uploadedImage && (
        <Card sx={{ maxWidth: 345, marginTop: 2 }}>
          <CardMedia
            component="img"
            height="140"
            image={uploadedImage}
            alt="Uploaded Image"
          />
          <Typography variant="caption" align="center" gutterBottom>
            Uploaded Image
          </Typography>
        </Card>
      )}
    </Container>
  );
};

export default MultiFormUploadMaterialUI;
/*import React, { useState,useEffect } from 'react';

export default function UploadImage(){
    const [file,setFile] = useState()
    const [imgUrl ,setImgUrl] = useState()



   
   
    const upload = () =>{
        
        const formData = new FormData()
        formData.append('file',file)
        var requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
            };
        fetch("http://localhost:3333/insertimg", requestOptions)
        .then(response => response.json())
        .then(result => {
            alert(result['status'])
            if(result['status'] === 'success'){
                window.location.href = '/Banner'
            }else{
                window.location.href = '/Banner'
            }

        })
        .catch(error => console.log('error', error));
     }
     return (
        <div>
            <input type = "file" onChange={(e)=> setFile(e.target.files[0])}/>

            <button type="button" onClick = {upload}>Upload</button>
        </div>

     )
 

}

   */
  