import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { editFish, fetchSingleFish } from '../api/Api';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function EditFishModal({ open, handleClose, fishId }) {
  const [jenisIkan, setJenisIkan] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [harga, setHarga] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const fishData = await fetchSingleFish    (fishId);
      setJenisIkan(fishData.jenis_ikan);
      setJumlah(fishData.jumlah_ikan);
      setHarga(fishData.harga_ikan);
    };

    if (fishId) {
      fetchData();
    }
  }, [fishId]);

  const handleSubmit = async () => {
    try {
      await editFish(fishId, jenisIkan, jumlah, harga);
      handleClose();
      window.location.reload(); // Refresh the page to see the updated fish
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h2>Edit Ikan</h2>
        <TextField
          fullWidth
          label="Jenis Ikan"
          value={jenisIkan}
          onChange={(e) => setJenisIkan(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Jumlah"
          value={jumlah}
          onChange={(e) => setJumlah(e.target.value)}
          margin="normal"
          type="number"
        />
        <TextField
          fullWidth
          label="Harga"
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
          margin="normal"
          type="number"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Update
        </Button>
      </Box>
    </Modal>
  );
}

export default EditFishModal;
