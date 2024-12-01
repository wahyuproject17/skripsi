import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/SideBar';
import NavbarAdmin from '../../components/navbarAdmin';
import FooterAdmin from '../../components/FooterAdmin';
import { fetchUsers, deleteUser, updateUser, addUser } from '../../api/Api';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, TextField, Button,
  Box, Typography, IconButton, Grid, TablePagination, InputAdornment, Stack
} from '@mui/material';
import { Delete, Edit, Search } from '@mui/icons-material';

function UserTable() {
  const [data, setData] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({
    nama_lengkap: '',
    username: '',
    email: '',
    jenkel: '',
    no_hp: '',
    alamat: '',
    password: ''
  });
  const [searchTerm, setSearchTerm] = useState(''); // State untuk nilai input pencarian
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Jumlah baris per halaman

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const users = await fetchUsers();
      setData(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (user) => {
    setEditData(user);
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateUser = async () => {
    try {
      await updateUser(editData.id_user, editData);
      const updatedUsers = data.map(user => (user.id_user === editData.id_user ? editData : user));
      setData(updatedUsers);
      setEditModalOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      const updatedUsers = data.filter(user => user.id_user !== userId);
      setData(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleAddUserChange = (e) => {
    setNewUserData({
      ...newUserData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddUser = async () => {
    try {
      const newUser = await addUser(newUserData);
      setData([...data, newUser]);
      getUsers();
      setNewUserData({
        nama_lengkap: '',
        username: '',
        email: '',
        jenkel: '',
        no_hp: '',
        alamat: '',
        password: ''
      });
      setAddModalOpen(false);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  // Fungsi untuk memfilter data berdasarkan nilai pencarian
  const filteredData = Array.isArray(data) ? data.filter(user =>
    user.nama_lengkap?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.no_hp?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.alamat?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div style={{ display: 'flex', backgroundColor: '#FFF', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ width: '100%' }}>
        <NavbarAdmin />
        <div style={{ padding: '20px', marginLeft: '250px', marginTop: '50px' }}>
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
                  <Typography variant="body1">Tambah Pengguna</Typography>
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
                  <TableCell align='center'>Alamat</TableCell>
                  <TableCell align='center'>No HP</TableCell>
                  <TableCell align='center'>Tanggal Bergabung</TableCell>
                  <TableCell align='center'>Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <TableRow key={row.id_user} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row"><Typography variant="body2">{index + 1 + page * rowsPerPage}</Typography></TableCell>
                    <TableCell align='center'>{row.nama_lengkap}</TableCell>
                    <TableCell align='center'>{row.username}</TableCell>
                    <TableCell align='center'>{row.email}</TableCell>
                    <TableCell align='center'>{row.alamat}</TableCell>
                    <TableCell align='center'>{row.no_hp}</TableCell>
                    <TableCell align='center'>{row.user_tanggal}</TableCell>
                    <TableCell align='center'>
                      <IconButton color="primary" onClick={() => handleEditClick(row)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => handleDeleteUser(row.id_user)}>
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
            count={filteredData.length} // Menggunakan panjang data yang telah difilter
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
        <FooterAdmin />
      </div>

      {/* Edit Modal */}
      <Modal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
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
            width: '90%',
            maxWidth: '600px',
            maxHeight: '90%',
            overflowY: 'auto',
          }}
        >
          {editData && (
            <>
              <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
                Edit Pengguna
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
                      InputProps={{ sx: { fontSize: '16px' } }}
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
                      InputProps={{ sx: { fontSize: '16px' } }}
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
                      InputProps={{ sx: { fontSize: '16px' } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Jenis Kelamin"
                      name="jenkel"
                      value={editData.jenkel}
                      onChange={handleEditChange}
                      margin="normal"
                      InputProps={{ sx: { fontSize: '16px' } }}
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
                      InputProps={{ sx: { fontSize: '16px' } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Alamat"
                      name="alamat"
                      value={editData.alamat}
                      onChange={handleEditChange}
                      margin="normal"
                      InputProps={{ sx: { fontSize: '16px' } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Kata Sandi"
                      name="password"
                      type="password"
                      value={editData.password}
                      onChange={handleEditChange}
                      margin="normal"
                      InputProps={{ sx: { fontSize: '16px' } }}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ marginTop: 2 }}>
                  <Button variant="contained" color="primary" onClick={handleUpdateUser}>Update</Button>
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
            width: '90%',
            maxWidth: '600px',
            maxHeight: '90%',
            overflowY: 'auto',
          }}
        >
          <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
            Tambah Pengguna Baru
          </Typography>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nama Lengkap"
                  name="nama_lengkap"
                  value={newUserData.nama_lengkap}
                  onChange={handleAddUserChange}
                  margin="normal"
                  InputProps={{ sx: { fontSize: '16px' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={newUserData.username}
                  onChange={handleAddUserChange}
                  margin="normal"
                  InputProps={{ sx: { fontSize: '16px' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={newUserData.email}
                  onChange={handleAddUserChange}
                  margin="normal"
                  InputProps={{ sx: { fontSize: '16px' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Jenis Kelamin"
                  name="jenkel"
                  value={newUserData.jenkel}
                  onChange={handleAddUserChange}
                  margin="normal"
                  InputProps={{ sx: { fontSize: '16px' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="No HP"
                  name="no_hp"
                  value={newUserData.no_hp}
                  onChange={handleAddUserChange}
                  margin="normal"
                  InputProps={{ sx: { fontSize: '16px' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Alamat"
                  name="alamat"
                  value={newUserData.alamat}
                  onChange={handleAddUserChange}
                  margin="normal"
                  InputProps={{ sx: { fontSize: '16px' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Kata Sandi"
                  name="password"
                  type="password"
                  value={newUserData.password}
                  onChange={handleAddUserChange}
                  margin="normal"
                  InputProps={{ sx: { fontSize: '16px' } }}
                />
              </Grid>
            </Grid>
            <Box sx={{ marginTop: 2 }}>
              <Button variant="contained" color="primary" onClick={handleAddUser}>Tambah</Button>
              <Button variant="outlined" color="secondary" onClick={() => setAddModalOpen(false)} sx={{ marginLeft: 2 }}>Batal</Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default UserTable;
