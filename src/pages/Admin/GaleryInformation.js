import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/SideBar';
import NavbarAdmin from '../../components/navbarAdmin';
import FooterAdmin from '../../components/FooterAdmin';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Modal,
  TextField,
  Button,
  IconButton,
  Typography,
  InputAdornment,
  Stack,
  Box,
} from '@mui/material';
import { fetchGaleriFoto, updateGaleriFoto, deleteGaleriFoto, createGaleriFoto } from '../../api/Api'; // Sesuaikan dengan path yang benar ke api.js
import { Delete, Edit, Add, Search } from '@mui/icons-material'; // Import icon Add untuk tombol tambah

function GaleryInformation() {
  const [galeriFoto, setGaleriFoto] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // State untuk form tambah foto
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newData, setNewData] = useState({
    title: '',
    description: '',
    image: null, // Menyimpan file gambar
  });

  // State untuk pencarian
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Jumlah baris per halaman

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedGaleriFoto = await fetchGaleriFoto();
        setGaleriFoto(fetchedGaleriFoto);
      } catch (error) {
        console.error('Error fetching galeri foto:', error);
      }
    };
    fetchData();
  }, []);

  const handleEditClick = (item) => {
    setEditData(item);
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    if (e.target.name === 'image') {
      // Jika yang diubah adalah file gambar
      setEditData({
        ...editData,
        image: e.target.files[0], // Simpan file gambar yang baru dipilih
      });
    } else {
      // Jika yang diubah adalah judul atau deskripsi
      setEditData({
        ...editData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleUpdateGaleri = async () => {
    try {
      const formData = new FormData();
      formData.append('title', editData.title);
      formData.append('description', editData.description);
      formData.append('image', editData.image); // Gunakan file gambar yang sudah diset

      await updateGaleriFoto(editData.id_gallery, formData);
      const updatedGaleri = galeriFoto.map((item) =>
        item.id_gallery === editData.id_gallery ? { ...item, title: editData.title, description: editData.description } : item
      );
      setGaleriFoto(updatedGaleri);
      setEditModalOpen(false);
    } catch (error) {
      console.error('Error updating galeri:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteGaleriFoto(id);
      const updatedGaleri = galeriFoto.filter((item) => item.id_gallery !== id);
      setGaleriFoto(updatedGaleri);
      console.log('Item galeri berhasil dihapus');
    } catch (error) {
      console.error('Error deleting galeri:', error);
    }
  };

  // Fungsi untuk menangani perubahan input pada form tambah foto
  const handleAddChange = (e) => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    });
  };

  // Fungsi untuk meng-handle pengiriman data form tambah foto ke backend
  const handleAddSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('title', newData.title);
      formData.append('description', newData.description);
      formData.append('image', newData.image);

      await createGaleriFoto(formData);
      setAddModalOpen(false);

      // Fetch ulang data galeri setelah berhasil menambahkan
      const fetchedGaleriFoto = await fetchGaleriFoto();
      setGaleriFoto(fetchedGaleriFoto);
    } catch (error) {
      console.error('Error adding galeri foto:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Fungsi untuk memproses pemilihan file gambar pada form tambah
  const handleFileChange = (e) => {
    setNewData({
      ...newData,
      image: e.target.files[0], // Ambil file pertama dari array files
    });
  };

  // Fungsi untuk filter galeri berdasarkan pencarian
  const filteredGaleriFoto = galeriFoto.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div style={{ display: 'flex', backgroundColor: '#FFF', minHeight: '100vh' }}>
        <Sidebar />
        <div style={{ width: '100%' }}>
          <NavbarAdmin />
          <div style={{ padding: '20px', marginLeft: '250px', marginTop: '50px' }}>
            {/* Input pencarian */}
            <Stack
              spacing={2}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              marginBottom={2}
            >
              <Box sx={{ minWidth: '150px' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setAddModalOpen(true)}
                  fullWidth
                >
                  <Typography variant="body1">Tambah Foto</Typography>
                </Button>
              </Box>
              <TextField
                label="Cari Foto"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                sx={{ flex: 1, maxWidth: '300px' }} // Menyeting lebar maksimum TextField
                InputProps={{
                  endAdornment: <InputAdornment position="end"><Search /></InputAdornment>,
                }}
              />
            </Stack>


            {/* Tabel data galeri */}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">#</TableCell>
                    <TableCell align="center">Judul</TableCell>
                    <TableCell align="center">Deskripsi</TableCell>
                    <TableCell align="center">Foto</TableCell>
                    <TableCell align="center">Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {filteredGaleriFoto
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Menggunakan pagination pada data yang difilter
                  .map((item, index) => (
                    <TableRow key={item.id_gallery}>
                      <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell> {/* Koreksi nomor urut */}
                      <TableCell align="center">{item.title}</TableCell>
                      <TableCell align="center">{item.description}</TableCell>
                      <TableCell align="center">
                        <img
                          src={`https://duanol.bbimijen.my.id/${item.image_url}`}
                          alt={`Foto ${item.title}`}
                          style={{ maxWidth: '100px' }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" onClick={() => handleEditClick(item)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => handleDelete(item.id_gallery)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>

              </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredGaleriFoto.length} // Menggunakan panjang data yang telah difilter
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          </div>
          <FooterAdmin />
        </div>
      </div>

      {/* Modal Form Edit */}
      <Modal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        aria-labelledby="edit-galeri-modal-title"
        aria-describedby="edit-galeri-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper sx={{ p: 3, maxWidth: '80%', maxHeight: '80%', overflow: 'auto' }}>
          {editData && (
            <>
              <h2 id="edit-galeri-modal-title">Edit Foto</h2>
              <form>
                <TextField
                  fullWidth
                  label="Judul"
                  name="title"
                  value={editData.title}
                  onChange={handleEditChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Deskripsi"
                  name="description"
                  value={editData.description}
                  onChange={handleEditChange}
                  margin="normal"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleEditChange({ target: { name: 'image', files: e.target.files } })}
                  style={{ marginBottom: '20px' }}
                />
                <div>
                  <Button variant="contained" color="primary" onClick={handleUpdateGaleri}>
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setEditModalOpen(false)}
                    style={{ marginLeft: 10 }}
                  >
                    Batal
                  </Button>
                </div>
              </form>
            </>
          )}
        </Paper>
      </Modal>

      {/* Modal Form Tambah */}
      <Modal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        aria-labelledby="add-galeri-modal-title"
        aria-describedby="add-galeri-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper sx={{ p: 3, maxWidth: '80%', maxHeight: '80%', overflow: 'auto' }}>
          <h2 id="add-galeri-modal-title">Tambah Foto</h2>
          <form>
            <TextField
              fullWidth
              label="Judul"
              name="title"
              value={newData.title}
              onChange={handleAddChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Deskripsi"
              name="description"
              value={newData.description}
              onChange={handleAddChange}
              margin="normal"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ marginBottom: '20px' }}
            />
            <div>
              <Button variant="contained" color="primary" onClick={handleAddSubmit}>
                Tambah
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setAddModalOpen(false)}
                style={{ marginLeft: 10 }}
              >
                Batal
              </Button>
            </div>
          </form>
        </Paper>
      </Modal>
    </>
  );
}

export default GaleryInformation;
