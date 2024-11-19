import React, { useEffect, useState } from 'react';
import { Table, Container, Spinner, Alert } from 'react-bootstrap';
import { fetchOrderById } from '../api/Api'; // Update the import path based on your API file

const History = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const id = localStorage.getItem('id');
  
  // Fetch order history from API (using userId)
  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError('User not logged in');
        setLoading(false);
        return;
      }

      try {
        const orders = await fetchOrderById(id); // Call API using userId
        setOrderHistory(orders);
      } catch (err) {
        setError('Failed to fetch order history');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Fetch data when userId changes

  if (loading) {
    return (
      <Container style={{ marginTop: '50px' }}>
        <h3>Riwayat Pesanan</h3>
        <Spinner animation="border" variant="primary" />
        <span> Loading...</span>
      </Container>
    );
  }

  if (error) {
    return (
      <Container style={{ marginTop: '50px' }}>
        <h3>Riwayat Pesanan</h3>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: '50px' }}>
      <h3>Riwayat Pesanan</h3>
      {/* Add table-responsive class to make the table scrollable on smaller screens */}
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Jenis Ikan</th>
              <th>Ukuran</th>
              <th>Jumlah</th>
              <th>Harga</th>
              <th>Tanggal</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.jenis_ikan}</td>
                <td>{order.ukuran}</td>
                <td>{order.jumlah_ikan}</td>
                <td>{order.harga.toLocaleString()}</td>
                <td>{new Date(order.pesanan_tanggal).toLocaleDateString('id-ID')}</td>
                <td>{order.status || 'pending'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default History;
