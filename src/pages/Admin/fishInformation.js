import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/SideBar';
import NavbarAdmin from '../../components/navbarAdmin';
import FooterAdmin from '../../components/FooterAdmin';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, 
  TextField, Button, IconButton, Typography, MenuItem, Select, InputLabel, FormControl, Box 
} from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { fetchIkan, deleteIkan, updateIkan, addIkan } from '../../api/Api';

function FishInformation() {
  const [ikan, setIkan] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newFishData, setNewFishData] = useState({
    jenis_ikan: '',
    kategori: '',
    harga_ikan: '',
    foto_ikan: null
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
          ? { 
              ...editData, 
              foto_ikan: editData.foto_ikan instanceof File 
                ? URL.createObjectURL(editData.foto_ikan) 
                : item.foto_ikan 
            }
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
      setIkan([...ikan, { 
        ...newFish, 
        foto_ikan: newFish.foto_ikan 
          ? URL.createObjectURL(newFish.foto_ikan) 
          : null 
      }]);
      setNewFishData({ jenis_ikan: '', kategori: '', harga_ikan: '', foto_ikan: null });
      setAddModalOpen(false);
    } catch (error) {
      console.error('Error adding fish:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#FFF', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ width: '100%' }}>
        <NavbarAdmin />
        <Box 
          sx={{ 
            padding: '20px', 
            marginLeft: isMobile ? '0px' : '250px', 
            marginTop: '50px',
            transition: 'margin-left 0.3s ease'
          }}
        >
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => setAddModalOpen(true)} 
            sx={{ marginBottom: 2 }}
          >
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
                      {item.foto_ikan && (
                        <img 
                          src={`https://duanol.bbimijen.my.id/${item.foto_ikan}`} 
                          alt={`Foto ${item.jenis_ikan}`} 
                          style={{ maxWidth: '100px', borderRadius: '8px' }} 
                        />
                      )}
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
        </Box>
        <FooterAdmin />
      </Box>

      {/* Edit Modal */}
      <Modal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-labelledby="edit-ikan-modal-title"
        aria-describedby="edit-ikan-modal-description"
      >
        <Box 
          sx={{
            backgroundColor: 'white',
            padding: 3,
            borderRadius: 2,
            width: isMobile ? '90%' : '50%',
            maxWidth: '600px',
            maxHeight: '90%',
            overflowY: 'auto',
          }}
        >
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
                {editData.foto_ikan && (
                  <img 
                    src={`https://duanol.bbimijen.my.id/${editData.foto_ikan}`} 
                    alt={`Foto ${editData.jenis_ikan}`} 
                    style={{ maxWidth: '200px', borderRadius: '8px' }} 
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, true)}
                  style={{ marginTop: 20 }}
                />
                <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                  <Button variant="contained" color="primary" onClick={handleUpdateIkan}>
                    Update
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => setEditModalOpen(false)}>
                    Batal
                  </Button>
                </Box>
              </form>
            </>
          )}
        </Box>
      </Modal>

      {/* Add Modal */}
      <Modal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-labelledby="add-ikan-modal-title"
        aria-describedby="add-ikan-modal-description"
      >
        <Box 
          sx={{
            backgroundColor: 'white',
            padding: 3,
            borderRadius: 2,
            width: isMobile ? '90%' : '50%',
            maxWidth: '600px',
            maxHeight: '90%',
            overflowY: 'auto',
          }}
        >
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
            <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button variant="contained" color="primary" onClick={handleAddFish}>
                Tambah
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => setAddModalOpen(false)}>
                Batal
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}

export default FishInformation;
