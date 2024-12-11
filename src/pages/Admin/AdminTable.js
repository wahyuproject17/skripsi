import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/SideBar';
import NavbarAdmin from '../../components/navbarAdmin';
import FooterAdmin from '../../components/FooterAdmin';
import {
  useTheme,useMediaQuery, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, TextField, Button,
  Box, Typography, IconButton, Grid, TablePagination, InputAdornment, Stack, Container
} from '@mui/material';
import { Delete, Edit, Search } from '@mui/icons-material';
import { fetchAdmin, updateAdmin, deleteAdmins, addAdmin } from '../../api/Api'; // Pastikan API diimpor dengan benar

function AdminTable() {
  const [data, setDatas] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newAdminData, setNewAdminData] = useState({
    nama_lengkap: '',
    username: '',
    email: '',
    no_hp: '',
    password: ''
  });
  const [searchTerm, setSearchTerm] = useState(''); // State untuk nilai input pencarian
  const [page, setPage] = useState(0); // State untuk halaman saat ini
  const [rowsPerPage, setRowsPerPage] = useState(5); // State untuk jumlah data per halaman
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    getAdmins();
  }, []);

  const getAdmins = async () => {
    try {
      const data = await fetchAdmin();
      setDatas(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (admin) => {
    setEditData(admin);
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateAdmin = async () => {
    try {
      await updateAdmin(editData.id_admin, editData);
      getAdmins();
      setEditModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddAdminChange = (e) => {
    setNewAdminData({
      ...newAdminData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddAdmin = async () => {
    try {
      const newAdmin = await addAdmin(newAdminData);
      setDatas([...data, newAdmin]);
      await getAdmins();
      setNewAdminData({ nama_lengkap: '', username: '', email: '', no_hp: '', password: '' });
      setAddModalOpen(false);
    } catch (error) {
      console.error('Error adding admin:', error);
    }
  };

  const handleDeleteAdmin = async (id) => {
    try {
      await deleteAdmins(id);
      getAdmins();
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  // Fungsi untuk memfilter data berdasarkan nilai pencarian
  const filteredData = Array.isArray(data) ? data.filter(user =>
    user.nama_lengkap?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.no_hp?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

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
                <Typography variant="body1">Tambah Admin</Typography>
              </Button>
            </Box>
            <TextField
              label="Cari Pengguna"
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
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align='center'>#</TableCell>
                  <TableCell align='center'>Nama Lengkap</TableCell>
                  <TableCell align='center'>Username</TableCell>
                  <TableCell align='center'>Email</TableCell>
                  <TableCell align='center'>No HP</TableCell>
                  <TableCell align='center'>Tanggal Bergabung</TableCell>
                  <TableCell align="center">Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <TableRow key={row.id_admin}>
                    <TableCell align='center'>{index + 1}</TableCell>
                    <TableCell align='center'>{row.nama_lengkap}</TableCell>
                    <TableCell align='center'>{row.username}</TableCell>
                    <TableCell align='center'>{row.email}</TableCell>
                    <TableCell align='center'>{row.no_hp}</TableCell>
                    <TableCell align='center'>{row.admin_tanggal}</TableCell>
                    <TableCell align='center'>
                      <IconButton color="primary" onClick={() => handleEditClick(row)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => handleDeleteAdmin(row.id_admin)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Table Pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]} // Opsi jumlah data per halaman yang tersedia
            component="div"
            count={filteredData.length} // Jumlah total data
            rowsPerPage={rowsPerPage} // Jumlah data per halaman saat ini
            page={page} // Halaman saat ini
            onPageChange={(event, newPage) => setPage(newPage)} // Callback saat halaman berubah
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0); // Kembali ke halaman pertama saat mengubah jumlah data per halaman
            }}
          />
        </Box>
        <FooterAdmin />
      </Box>

      {/* Edit Modal */}
      <Modal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        aria-labelledby="edit-admin-modal-title"
        aria-describedby="edit-admin-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
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
              <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
                Edit Admin
              </Typography>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Nama Lengkap"
                      name="nama_lengkap"
                      value={editData.nama_lengkap}
                      onChange={handleEditChange}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Username"
                      name="username"
                      value={editData.username}
                      onChange={handleEditChange}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={editData.email}
                      onChange={handleEditChange}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="No HP"
                      name="no_hp"
                      value={editData.no_hp}
                      onChange={handleEditChange}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Kata Sandi"
                      name="password"
                      type="password" // Menyembunyikan teks input
                      value={editData.password || ''} // Menampilkan password jika diisi
                      onChange={handleEditChange}
                      margin="normal"
                      placeholder="Kosongkan jika tidak ingin mengubah"
                    />
                  </Grid>
                </Grid>
                <Box sx={{ marginTop: 2 }}>
                  <Button variant="contained" color="primary" onClick={handleUpdateAdmin}>Update</Button>
                  <Button variant="outlined" color="secondary" onClick={() => setEditModalOpen(false)} sx={{ marginLeft: 2 }}>Batal</Button>
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
        aria-labelledby="add-admin-modal-title"
        aria-describedby="add-admin-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
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
          <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
            Tambah Admin Baru
          </Typography>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nama Lengkap"
                  name="nama_lengkap"
                  value={newAdminData.nama_lengkap}
                  onChange={handleAddAdminChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={newAdminData.username}
                  onChange={handleAddAdminChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={newAdminData.email}
                  onChange={handleAddAdminChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="No HP"
                  name="no_hp"
                  value={newAdminData.no_hp}
                  onChange={handleAddAdminChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Kata Sandi"
                  name="password"
                  type="password" // Menyembunyikan teks input
                  value={newAdminData.password}
                  onChange={handleAddAdminChange}
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Box sx={{ marginTop: 2 }}>
              <Button variant="contained" color="primary" onClick={handleAddAdmin}>Tambah</Button>
              <Button variant="outlined" color="secondary" onClick={() => setAddModalOpen(false)} sx={{ marginLeft: 2 }}>Batal</Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}

export default AdminTable;
