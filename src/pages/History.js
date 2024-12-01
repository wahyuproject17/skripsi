import React, { useEffect, useState } from 'react';
import { Table, Container, Spinner, Alert, Button, Modal, Form } from 'react-bootstrap';
import { fetchOrderById, ratingOrder } from '../api/Api'; // Update import path

const History = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rating, setRating] = useState('');

  const id = localStorage.getItem('id');

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError('User not logged in');
        setLoading(false);
        return;
      }

      try {
        const orders = await fetchOrderById(id);
        setOrderHistory(orders);
      } catch (err) {
        setError('Failed to fetch order history');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleRating = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const submitRating = async () => {
    try {
      await ratingOrder(selectedOrder.id_pesanan, { rating });
      const updatedOrderHistory = orderHistory.map(order => {
        if (order.id_pesanan === selectedOrder.id_pesanan) {
          return { ...order, tingkat_kepuasan: rating }; // Update the rating
        }
        return order;
      });
  
      setOrderHistory(updatedOrderHistory);
      setShowModal(false);
      setRating('');
      alert('Berhasil mengirimkan penilaian!');
    } catch (err) {
      alert('Gagal mengirimkan penilaian');
    }
  };

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

  const hasSuccessfulOrders = orderHistory.some((order) => order.status === 'berhasil');

  return (
    <Container style={{ marginTop: '50px' }}>
      <h3>Riwayat Pesanan</h3>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="text-center">No</th>
              <th className="text-center">Jenis Ikan</th>
              <th className="text-center">Ukuran</th>
              <th className="text-center">Jumlah</th>
              <th className="text-center">Harga</th>
              <th className="text-center">Tanggal</th>
              <th className="text-center">Status</th>
              {hasSuccessfulOrders && <th className="text-center">Kepuasan</th>}
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order, index) => (
              <tr key={order.id_pesanan}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{order.jenis_ikan}</td>
                <td className="text-center">{order.ukuran}</td>
                <td className="text-center">{order.jumlah_ikan}</td>
                <td className="text-center">{order.harga.toLocaleString()}</td>
                <td className="text-center">{new Date(order.pesanan_tanggal).toLocaleDateString('id-ID')}</td>
                <td className="text-center">{order.status || 'pending'}</td>
                {order.status === 'berhasil' && (
                <td className="text-center">
                  {order.tingkat_kepuasan ? (
                    order.tingkat_kepuasan
                  ) : (
                    <Button variant="primary" onClick={() => handleRating(order)}>
                      Beri penilaian
                    </Button>
                  )}
                </td>
              )}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal for Rating */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tingkat Kepuasan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Berikan penilaian disini.</Form.Label>
              <Form.Check
                type="radio"
                label="Kurang Puas"
                name="rating"
                value="kurang puas"
                checked={rating === 'kurang puas'}
                onChange={(e) => setRating(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Cukup Puas"
                name="rating"
                value="cukup puas"
                checked={rating === 'cukup puas'}
                onChange={(e) => setRating(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Puas"
                name="rating"
                value="puas"
                checked={rating === 'puas'}
                onChange={(e) => setRating(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Sangat Puas"
                name="rating"
                value="sangat puas"
                checked={rating === 'sangat puas'}
                onChange={(e) => setRating(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Tutup
          </Button>
          <Button variant="primary" onClick={submitRating} disabled={!rating}>
            Kirim
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default History;
