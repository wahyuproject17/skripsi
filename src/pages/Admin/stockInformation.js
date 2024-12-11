import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/SideBar';
import NavbarAdmin from '../../components/navbarAdmin';
import FooterAdmin from '../../components/FooterAdmin';
import { Delete, Edit } from '@mui/icons-material';
import { useTheme,useMediaQuery, Box, Table, TableBody, TableCell, IconButton, TableContainer, TableHead, TableRow, Paper, Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { fetchIkan, deleteBenih, deleteKonsumsi, editBenih, editKonsumsi, addBenih, addKonsumsi, getAllIkan } from '../../api/Api';

function FishInformation() {
  const [ikan, setIkan] = useState([]); // State untuk menampilkan data di tabel
  const [ikanList, setIkanList] = useState([]); // State untuk mengisi dropdown jenis ikan
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [formType, setFormType] = useState('benih'); // State untuk menentukan form benih atau konsumsi
  const [newFishData, setNewFishData] = useState({
    id_ikan: '', // Menyimpan id_ikan yang dipilih
    ukuran_ikan: '',
    jumlah_ikan: '',
    harga_ikan: '',
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Mengambil data gabungan untuk tabel
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getAllIkan();
        if (fetchedData.benih || fetchedData.konsumsi) {
          const combinedData = [
            ...(fetchedData.benih || []),
            ...(fetchedData.konsumsi || [])
          ];
          setIkan(combinedData);
        }
      } catch (error) {
        console.error('Error fetching data for table:', error);
      }
    };
    fetchData();
  }, []);

  // Mengambil daftar jenis ikan untuk dropdown
  useEffect(() => {
    const fetchIkanList = async () => {
      try {
        const fetchedIkanList = await fetchIkan();
        setIkanList(fetchedIkanList);
      } catch (error) {
        console.error('Error fetching fish list:', error);
      }
    };
    fetchIkanList();
  }, []);

  const handleDelete = async (item) => {
    try {
      if (item.kategori === 'Benih') {
        await deleteBenih(item.id_benih);
      } else if (item.kategori === 'Konsumsi') {
        await deleteKonsumsi(item.id_konsumsi);
      }
      const updatedIkan = ikan.filter(i => (i.kategori === 'Benih' ? i.id_benih : i.id_konsumsi) !== (item.kategori === 'Benih' ? item.id_benih : item.id_konsumsi));
      setIkan(updatedIkan);
      console.log('Item ikan berhasil dihapus');
    } catch (error) {
      console.error('Error deleting ikan:', error);
    }
  };

  const handleEditClick = (item) => {
    setEditData(item);
    setFormType(item.kategori === 'Benih' ? 'benih' : 'konsumsi');
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateIkan = async () => {
    try {
      if (editData.kategori === 'Benih') {
        await editBenih(editData.id_benih, editData);
      } else if (editData.kategori === 'Konsumsi') {
        await editKonsumsi(editData.id_konsumsi, editData);
      }
      // Fetch ulang data dari server
      const fetchedData = await getAllIkan();
      if (fetchedData.benih || fetchedData.konsumsi) {
        const combinedData = [
          ...(fetchedData.benih || []),
          ...(fetchedData.konsumsi || [])
        ];
        setIkan(combinedData);
      }
      setEditModalOpen(false);
    } catch (error) {
      console.error('Error updating ikan:', error);
    }
  };
  

  const handleAddFishChange = (e) => {
    const { name, value } = e.target;
    setNewFishData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormTypeChange = (e) => {
    setFormType(e.target.value);
    if (e.target.value === 'konsumsi') {
      setNewFishData(prevState => ({
        ...prevState,
        ukuran_ikan: '', // Reset ukuran_ikan jika form type adalah konsumsi
      }));
    }
  };

  const handleAddFish = async () => {
    try {
      let newFish;
      if (formType === 'benih') {
        newFish = await addBenih(newFishData);
      } else if (formType === 'konsumsi') {
        const { id_ikan, jumlah_ikan, harga_ikan } = newFishData;
        newFish = await addKonsumsi({ id_ikan, jumlah_ikan, harga_ikan });
      }
      setIkan([...ikan, newFish]);
      const fetchedData = await getAllIkan();
      if (fetchedData.benih || fetchedData.konsumsi) {
        const combinedData = [
          ...(fetchedData.benih || []),
          ...(fetchedData.konsumsi || [])
        ];
        setIkan(combinedData);
      }
      setNewFishData({ id_ikan: '', ukuran_ikan: '', jumlah_ikan: '', harga_ikan: '' });
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
              Tambah Stok
            </Button>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">#</TableCell>
                    <TableCell align="center">Jenis Ikan</TableCell>
                    <TableCell align="center">Ukuran</TableCell>
                    <TableCell align="center">Jumlah</TableCell>
                    <TableCell align="center">Harga</TableCell>
                    <TableCell align="center">Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ikan.map((row, index) => (
                    <TableRow
                      key={row.id_benih || row.id_konsumsi}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{row.jenis_ikan}</TableCell>
                      <TableCell align="center">{row.ukuran}</TableCell>
                      <TableCell align="center">{row.jumlah_ikan}</TableCell>
                      <TableCell align="center">{row.harga_ikan}</TableCell>
                      <TableCell align='center'>
                        <IconButton color="primary" onClick={() => handleEditClick(row)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => handleDelete(row)}>
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
              <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>Edit Informasi Ikan</Typography>
              <form>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="jenis-ikan-edit-label">Jenis Ikan</InputLabel>
                  <Select
                    labelId="jenis-ikan-edit-label"
                    id="jenis-ikan-edit-select"
                    value={editData.id_ikan}
                    onChange={handleEditChange}
                    name="id_ikan"
                    label="Jenis Ikan"
                  >
                    {ikanList.map((item) => (
                      <MenuItem key={item.id_ikan} value={item.id_ikan}>
                        {item.jenis_ikan}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Ukuran"
                  name="ukuran_ikan"
                  value={editData.ukuran_ikan}
                  onChange={handleEditChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Jumlah"
                  name="jumlah_ikan"
                  value={editData.jumlah_ikan}
                  onChange={handleEditChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Harga"
                  name="harga_ikan"
                  value={editData.harga_ikan}
                  onChange={handleEditChange}
                  margin="normal"
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
            <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>Tambah Stok Ikan</Typography>
            <form>
              <RadioGroup aria-label="form-type" name="formType" value={formType} onChange={handleFormTypeChange}>
                <FormControlLabel value="benih" control={<Radio />} label="Benih" />
                <FormControlLabel value="konsumsi" control={<Radio />} label="Konsumsi" />
              </RadioGroup>
              <FormControl fullWidth margin="normal">
                <InputLabel id="jenis-ikan-label">Jenis Ikan</InputLabel>
                <Select
                  labelId="jenis-ikan-label"
                  id="jenis-ikan-select"
                  value={newFishData.id_ikan}
                  onChange={handleAddFishChange}
                  name="id_ikan"
                  label="Jenis Ikan"
                >
                  {ikanList.map((item) => (
                    <MenuItem key={item.id_ikan} value={item.id_ikan}>
                      {item.jenis_ikan}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {formType === 'benih' && (
                <TextField
                  fullWidth
                  label="Ukuran"
                  name="ukuran_ikan"
                  value={newFishData.ukuran_ikan}
                  onChange={handleAddFishChange}
                  margin="normal"
                />
              )}
              <TextField
                fullWidth
                label="Jumlah"
                name="jumlah_ikan"
                value={newFishData.jumlah_ikan}
                onChange={handleAddFishChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Harga"
                name="harga_ikan"
                value={newFishData.harga_ikan}
                onChange={handleAddFishChange}
                margin="normal"
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
