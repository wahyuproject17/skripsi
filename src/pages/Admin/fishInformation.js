import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/SideBar';
import NavbarAdmin from '../../components/navbarAdmin';
import FooterAdmin from '../../components/FooterAdmin';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, TextField, Button, IconButton, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { fetchIkan, deleteIkan, updateIkan, addIkan } from '../../api/Api';
import { Edit, Delete } from '@mui/icons-material';

function FishInformation() {
  const [ikan, setIkan] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newFishData, setNewFishData] = useState({
    jenis_ikan: '',
    kategori: '',
    harga_ikan: '', // Harga sebagai string untuk fleksibilitas format
    foto_ikan: null // Foto disimpan sebagai objek File
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedIkan = await fetchIkan();
        setIkan(fetchedIkan);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteIkan(id);
      const updatedIkan = ikan.filter(item => item.id_ikan !== id);
      setIkan(updatedIkan);
      console.log('Item ikan berhasil dihapus');
    } catch (error) {
      console.error('Error deleting ikan:', error);
    }
  };

  const handleEditClick = (item) => {
    setEditData(item);
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      if (isEdit) {
        setEditData(prevData => ({
          ...prevData,
          foto_ikan: file
        }));
      } else {
        setNewFishData(prevData => ({
          ...prevData,
          foto_ikan: file
        }));
      }
    }
  };

  const handleUpdateIkan = async () => {
    try {
      const formData = new FormData();
      formData.append('jenis_ikan', editData.jenis_ikan);
      formData.append('kategori', editData.kategori);
      formData.append('harga_ikan', editData.harga_ikan);
      if (editData.foto_ikan instanceof File) {
        formData.append('foto_ikan', editData.foto_ikan);
      }

      await updateIkan(editData.id_ikan, formData);
      const updatedIkan = ikan.map(item =>
        item.id_ikan === editData.id_ikan
          ? { ...editData, foto_ikan: editData.foto_ikan instanceof File ? URL.createObjectURL(editData.foto_ikan) : item.foto_ikan }
          : item
      );
      setIkan(updatedIkan);
      setEditModalOpen(false);
    } catch (error) {
      console.error('Error updating ikan:', error);
    }
  };

  const handleAddFishChange = (e) => {
    const { name, value } = e.target;
    setNewFishData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddFish = async () => {
    try {
      const formData = new FormData();
      formData.append('jenis_ikan', newFishData.jenis_ikan);
      formData.append('kategori', newFishData.kategori);
      formData.append('harga_ikan', newFishData.harga_ikan);
      if (newFishData.foto_ikan) {
        formData.append('foto_ikan', newFishData.foto_ikan);
      }

      const newFish = await addIkan(formData);
      setIkan([...ikan, { ...newFish, foto_ikan: URL.createObjectURL(newFish.foto_ikan) }]);
      setNewFishData({ jenis_ikan: '', kategori: '', harga_ikan: '', foto_ikan: null });
      setAddModalOpen(false);
    } catch (error) {
      console.error('Error adding fish:', error);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', backgroundColor: '#FFF', minHeight: '100vh' }}>
        <Sidebar />
        <div style={{ width: '100%' }}>
          <NavbarAdmin />
          <div style={{ border: '1px solid black', padding: '20px' }}>
            <Button variant="contained" color="primary" onClick={() => setAddModalOpen(true)} style={{ marginBottom: 20 }}>
              Tambah Ikan
            </Button>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">#</TableCell>
                    <TableCell align="center">Jenis ikan</TableCell>
                    <TableCell align="center">Kategori</TableCell>
                    <TableCell align="center">Harga</TableCell>
                    <TableCell align="center">Foto</TableCell>
                    <TableCell align="center">Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ikan.map((item, index) => (
                    <TableRow
                      key={item.id_ikan}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{item.jenis_ikan}</TableCell>
                      <TableCell align="center">{item.kategori}</TableCell>
                      <TableCell align="center">{item.harga_ikan}</TableCell>
                      <TableCell align="center">
                        <img src={`https://duanol.bbimijen.my.id/${item.foto_ikan}`} alt={`Foto ${item.jenis_ikan}`} style={{ maxWidth: '100px' }} />
                      </TableCell>
                      <TableCell align='center'>
                        <IconButton color="primary" onClick={() => handleEditClick(item)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => handleDelete(item.id_ikan)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <FooterAdmin />
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        aria-labelledby="edit-ikan-modal-title"
        aria-describedby="edit-ikan-modal-description"
      >
        <div style={{
          padding: 20,
          backgroundColor: 'white',
          margin: 'auto',
          marginTop: '10%',
          width: '50%',
          maxHeight: '70vh',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column' // Mengatur elemen form ke arah kolom
        }}>
          {editData && (
            <>
              <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>Edit Ikan</Typography>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <TextField
                  fullWidth
                  label="Jenis Ikan"
                  name="jenis_ikan"
                  value={editData.jenis_ikan}
                  onChange={handleEditChange}
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Kategori</InputLabel>
                  <Select
                    name="kategori"
                    value={editData.kategori}
                    onChange={handleEditChange}
                    >
                    <MenuItem value="Benih">Benih</MenuItem>
                    <MenuItem value="Konsumsi">Konsumsi</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Harga"
                  name="harga_ikan"
                  value={editData.harga_ikan}
                  onChange={handleEditChange}
                  margin="normal"
                />
                <img src={`https://duanol.bbimijen.my.id/${editData.foto_ikan}`} alt={`Foto ${editData.jenis_ikan}`} style={{ maxWidth: '200px' }} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, true)}
                  style={{ marginTop: 20 }}
                />
                <div style={{ marginTop: 20, alignSelf: 'flex-end' }}>
                  <Button variant="contained" color="primary" onClick={handleUpdateIkan}>Update</Button>
                  <Button variant="outlined" color="secondary" onClick={() => setEditModalOpen(false)} style={{ marginLeft: 10 }}>Batal</Button>
                </div>
              </form>
            </>
          )}
        </div>
      </Modal>

      {/* Add Modal */}
      <Modal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        aria-labelledby="add-ikan-modal-title"
        aria-describedby="add-ikan-modal-description"
      >
        <div style={{
          padding: 20,
          backgroundColor: 'white',
          margin: 'auto',
          marginTop: '10%',
          width: '50%',
          maxHeight: '70vh',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column' // Mengatur elemen form ke arah kolom
        }}>
          <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>Tambah Ikan</Typography>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <TextField
              fullWidth
              label="Jenis Ikan"
              name="jenis_ikan"
              value={newFishData.jenis_ikan}
              onChange={handleAddFishChange}
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Kategori</InputLabel>
              <Select
                name="kategori"
                value={newFishData.kategori}
                onChange={handleAddFishChange}
              >
                <MenuItem value="Benih">Benih</MenuItem>
                <MenuItem value="Konsumsi">Konsumsi</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Harga"
              name="harga_ikan"
              value={newFishData.harga_ikan}
              onChange={handleAddFishChange}
              margin="normal"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e)}
              style={{ marginTop: 20 }}
            />
            <div style={{ marginTop: 20, alignSelf: 'flex-end' }}>
              <Button variant="contained" color="primary" onClick={handleAddFish}>Tambah</Button>
              <Button variant="outlined" color="secondary" onClick={() => setAddModalOpen(false)} style={{ marginLeft: 10 }}>Batal</Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default FishInformation;
