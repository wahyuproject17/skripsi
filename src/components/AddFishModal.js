import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { addFish } from '../api/Api';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddFishModal = ({ open, handleClose }) => {
  const [jenisIkan, setJenisIkan] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [harga, setHarga] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addFish(jenisIkan, jumlah, harga); 
      handleClose();
      window.alert('Ikan berhasil ditambahkan'); 
      window.location.reload();
    } catch (error) {
      console.error('Error adding fish:', error);
      window.alert('Terjadi kesalahan');
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Tambah Ikan
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Jenis Ikan"
            fullWidth
            margin="normal"
            value={jenisIkan}
            onChange={(e) => setJenisIkan(e.target.value)}
          />
          <TextField
            label="Jumlah"
            type="number"
            fullWidth
            margin="normal"
            value={jumlah}
            onChange={(e) => setJumlah(e.target.value)}
          />
          <TextField
            label="Harga"
            type="number"
            fullWidth
            margin="normal"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Tambah
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddFishModal;
