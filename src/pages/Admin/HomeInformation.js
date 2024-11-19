import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/SideBar';
import NavbarAdmin from '../../components/navbarAdmin';
import FooterAdmin from '../../components/FooterAdmin';
import { TextField, Container, Button, Typography, Box } from '@mui/material';
import { fetchTulisan, updateTulisanData } from '../../api/Api'; // Impor fungsi dari api.js

function HomeInformation() {
  const [tulisanData, setTulisanData] = useState({
    ucapan: "",
    alamat: "",
    telepon: "",
    instagram: "",
    email: ""
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchTulisan();
        if (data.length > 0) {
          setTulisanData(data[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTulisanData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const updatedData = await updateTulisanData(tulisanData.id_tulisan, tulisanData);
      console.log('Teks disimpan:', updatedData);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleReset = () => {
    setTulisanData({
      ucapan: "",
      alamat: "",
      telepon: "",
      instagram: "",
      email: ""
    });
  };

  return (
    <div style={{ display: 'flex', backgroundColor: '#FFF', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <NavbarAdmin />
        <Container style={{ padding: '40px' }}>
          <Box 
            style={{ 
              padding: '20px', 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)', 
              maxWidth: '800px', 
              margin: 'auto' 
            }}
          >
            <Typography variant="h5" gutterBottom style={{ marginBottom: '20px' }}>
              Informasi Beranda
            </Typography>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <TextField
                required
                name='ucapan'
                label='Ucapan'
                variant='outlined'
                value={tulisanData.ucapan}
                onChange={handleInputChange}
                multiline
                rows={4}
                fullWidth
              />
              <TextField
                required
                name='alamat'
                label='Alamat'
                variant='outlined'
                value={tulisanData.alamat}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                required
                name='telepon'
                label='WhatsApp'
                variant='outlined'
                value={tulisanData.telepon}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                required
                name='instagram'
                label='Instagram'
                variant='outlined'
                value={tulisanData.instagram}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                required
                name='email'
                label='Email'
                variant='outlined'
                value={tulisanData.email}
                onChange={handleInputChange}
                fullWidth
              />
              <Box style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleSave} 
                  style={{ flex: 1, marginRight: '10px' }}
                >
                  Simpan
                </Button>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  onClick={handleReset} 
                  style={{ flex: 1 }}
                >
                  Reset
                </Button>
              </Box>
            </form>
          </Box>
        </Container>
        <FooterAdmin />
      </div>
    </div>
  );
}

export default HomeInformation;
