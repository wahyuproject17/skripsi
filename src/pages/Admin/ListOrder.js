import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/SideBar';
import NavbarAdmin from '../../components/navbarAdmin';
import FooterAdmin from '../../components/FooterAdmin';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Modal, Box,
  Typography, Grid, TablePagination, TextField, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import { Delete as DeleteIcon, Description as DescriptionIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { fetchOrders, deleteOrder } from '../../api/Api';

function ListOrder() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedYear, setSelectedYear] = useState('All');
  const [years, setYears] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedOrders = await fetchOrders();
        setOrders(fetchedOrders);

        // Extract unique years from fetched orders
        const yearsSet = new Set(fetchedOrders.map(order => new Date(order.pesanan_tanggal).getFullYear()));
        setYears([...yearsSet]);

        setSearchResults(fetchedOrders); // Menyimpan hasil pencarian pertama kali di semua data pesanan
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Filter orders based on selected year and search term
    const filteredOrders = orders.filter(order => {
      const orderYear = new Date(order.pesanan_tanggal).getFullYear();
      return (selectedYear === 'All' || orderYear === parseInt(selectedYear)) &&
        order.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setSearchResults(filteredOrders);
  }, [selectedYear, searchTerm, orders]);

  // Fungsi untuk menghapus pesanan berdasarkan ID
  const handleDeleteOrder = async (id) => {
    try {
      await deleteOrder(id);
      setOrders(orders.filter(order => order.id_pesanan !== id));
      setSearchResults(searchResults.filter(order => order.id_pesanan !== id)); // Memperbarui hasil pencarian setelah penghapusan
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  // Fungsi untuk menampilkan detail pesanan
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setDetailModalOpen(true);
  };

  // Fungsi untuk menutup modal detail pesanan
  const handleCloseDetailModal = () => {
    setSelectedOrder(null);
    setDetailModalOpen(false);
  };

  const handleCompleteOrder = async (id) => {
    try {
      // Panggil API untuk memperbarui status pesanan
      const updatedOrder = await completeOrder(id);
  
      // Perbarui status pesanan di state
      const updatedOrders = orders.map(order =>
        order.id_pesanan === id ? { ...order, status: updatedOrder.status } : order
      );
      setOrders(updatedOrders);
      setSearchResults(updatedOrders); // Perbarui hasil pencarian
  
      console.log(`Pesanan dengan ID ${id} berhasil diselesaikan.`);
    } catch (error) {
      console.error('Error completing order:', error);
    }
  };
  

  // Menangani perubahan halaman
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Menangani perubahan jumlah data per halaman
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset halaman ke halaman pertama ketika mengubah jumlah data per halaman
  };

  // Menangani perubahan kata kunci pencarian
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Menangani perubahan tahun yang dipilih
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div>
      <div style={{ display: 'flex', backgroundColor: '#FFF', minHeight: '100vh' }}>
        <Sidebar />
        <div style={{ width: '100%'}}>
          <NavbarAdmin />
          <div style={{ padding: '20px' }}>
            {/* Dropdown tahun */}
            <FormControl variant="outlined" sx={{ marginBottom: '20px', minWidth: 120 }}>
              <InputLabel>Tahun</InputLabel>
              <Select
                value={selectedYear}
                onChange={handleYearChange}
                label="Tahun"
              >
                <MenuItem value="All">All</MenuItem>
                {years.map(year => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Input pencarian */}
            <TextField
              label="Cari berdasarkan nama pelanggan"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ marginBottom: '20px' }}
            />

            {/* Tabel pesanan */}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">No</TableCell>
                    <TableCell align="center">Nama</TableCell>
                    <TableCell align="center">Jenis ikan</TableCell>
                    <TableCell align="center">Jumlah</TableCell>
                    <TableCell align="center">Harga</TableCell>
                    <TableCell align="center">Tanggal</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? searchResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : searchResults
                  ).map((order, index) => (
                    <TableRow
                      key={order.id_pesanan}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">{order.nama_lengkap}</TableCell>
                      <TableCell align="center">{order.jenis_ikan}</TableCell>
                      <TableCell align="center">{order.jumlah_ikan}</TableCell>
                      <TableCell align="center">{order.harga}</TableCell>
                      <TableCell align="center">{order.pesanan_tanggal}</TableCell>
                      <TableCell align="center">{order.status || 'Belum selesai'}</TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" onClick={() => handleViewDetails(order)}>
                          <DescriptionIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDeleteOrder(order.id_pesanan)}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                        color="success"
                        onClick={() => handleCompleteOrder(order.id_pesanan)}
                        disabled={order.status === 'Selesai'} // Nonaktifkan tombol jika sudah selesai
                      >
                        <CheckCircleIcon />
                      </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Paginasi */}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={searchResults.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
          <FooterAdmin />
        </div>
      </div>

      {/* Modal detail pesanan */}
      <Modal
        open={detailModalOpen}
        onClose={handleCloseDetailModal}
        aria-labelledby="detail-order-modal-title"
        aria-describedby="detail-order-modal-description"
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
            Detail Pesanan
          </Typography>
          {selectedOrder && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography><strong>ID Pesanan:</strong> {selectedOrder.id_pesanan}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography><strong>Nama Pelanggan:</strong> {selectedOrder.nama_lengkap}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography><strong>Alamat:</strong> {selectedOrder.alamat}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography><strong>No WA:</strong> {selectedOrder.no_hp}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography><strong>Kategori:</strong> {selectedOrder.kategori}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography><strong>Jenis Ikan:</strong> {selectedOrder.jenis_ikan}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography><strong>Ukuran Ikan:</strong> {selectedOrder.ukuran}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography><strong>Jumlah Ikan:</strong> {selectedOrder.jumlah_ikan}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography><strong>Harga:</strong> {selectedOrder.harga}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography><strong>Tanggal Pesanan:</strong> {selectedOrder.pesanan_tanggal}</Typography>
              </Grid>
            </Grid>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default ListOrder;
