import React, { useState, useEffect } from "react";
import { StyleSheet, css } from 'aphrodite';
import { Row, Col, Container, Button, Modal, Form } from 'react-bootstrap';
import Headershow from "../components/headerSlideshow";
import NavigationBar from "../components/Navbar";
import Footer from "../components/Footer";
import { getBenih, getKonsumsi, addOrder, fetchIkan, getStock } from "../api/Api";

const Shop = () => {
    const [showModal, setShowModal] = useState(false);
    const [ikanData, setIkanData] = useState([]);
    const [benihData, setBenihData] = useState([]);
    const [konsumsiData, setKonsumsiData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Benih");
    const [selectedFish, setSelectedFish] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [availableStock, setAvailableStock] = useState(0);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const ikanResponse = await fetchIkan();
                const stockResponse = await getStock();
                
                const stockData = stockResponse.data;
                const combinedData = ikanResponse.map(ikan => {
                    const stockInfo = stockData.find(
                        stock => stock.jenis_ikan === ikan.jenis_ikan && stock.kategori.toLowerCase() === ikan.kategori.toLowerCase()
                    );

                    return {
                        ...ikan,
                        total: stockInfo ? stockInfo.total : 0
                    };
                });

                setIkanData(combinedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchAllData();
    }, []);

    useEffect(() => {
        getBenih()
            .then(data => setBenihData(data))
            .catch(error => console.error('Error fetching benih data:', error));

        getKonsumsi()
            .then(data => setKonsumsiData(data))
            .catch(error => console.error('Error fetching konsumsi data:', error));
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
        resetForm();
    };

    const handleShowModal = (fish) => {
        // Temukan kategori ikan berdasarkan data
        const fishData = ikanData.find(item => item.jenis_ikan === fish);
        const category = fishData ? fishData.kategori : "Benih"; // Default ke Benih jika tidak ditemukan
    
        setSelectedCategory(category);  // Set kategori otomatis
        setSelectedFish(fish);
        setSelectedSize(""); // Reset ukuran untuk semua kategori
        setShowModal(true);
    
        // Jika kategori Konsumsi, langsung hitung harga tanpa ukuran
        if (category === "Konsumsi") {
            calculateTotalPrice(fish, "", quantity); // Tidak ada ukuran untuk konsumsi
            updateAvailableStock(fish, "", category); // Mengupdate stok konsumsi
        }
        // Jika kategori Benih, biarkan ukuran ikan tetap kosong dan bisa dipilih
    };
    

    const handleSizeChange = (e) => {
        const size = e.target.value;
        setSelectedSize(size);
        calculateTotalPrice(selectedFish, size, quantity);
        updateAvailableStock(selectedFish, size, selectedCategory);
    };
    
    

    const handleQuantityChange = (e) => {
        const qty = parseInt(e.target.value) || '';
        setQuantity(qty);
        calculateTotalPrice(selectedFish, selectedSize, qty);
    };

    const calculateTotalPrice = (fish, size, qty) => {
        let price = 0;
        if (selectedCategory === "Benih") {
            const selectedFishData = benihData.find(item => item.jenis_ikan === fish && item.ukuran === size);
            price = selectedFishData ? selectedFishData.harga_ikan : 0;
        } else if (selectedCategory === "Konsumsi") {
            const selectedFishData = konsumsiData.find(item => item.jenis_ikan === fish);
            price = selectedFishData ? selectedFishData.harga_ikan : 0;
        }
        setTotalPrice(price * qty);
    };
    
    const updateAvailableStock = (fish, size, category) => {
        let stock = 0;
        if (category === "Benih") {
            const selectedFishData = benihData.find(item => item.jenis_ikan === fish && item.ukuran === size);
            stock = selectedFishData ? selectedFishData.jumlah_ikan : 0;
        } else if (category === "Konsumsi") {
            const selectedFishData = konsumsiData.find(item => item.jenis_ikan === fish);
            stock = selectedFishData ? selectedFishData.jumlah_ikan : 0;
        }
        setAvailableStock(stock);
    };
    

    const handleFormSubmit = (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Anda harus login terlebih dahulu untuk melakukan pemesanan');
            window.location.href = "/login";
            return;
        }
    
        if (quantity < 1) {
            alert('Jumlah beli harus lebih dari 0');
            return;
        }
    
        if (quantity > availableStock) {
            alert('Jumlah beli tidak bisa melebihi jumlah ikan yang tersedia');
            return;
        }
    
        const orderData = {
            kategori: selectedCategory,
            jenisikan: selectedFish,
            ukuran: selectedSize,
            jumlah: quantity,
            hargaikan: totalPrice
        };
    
        const headers = {
            'Authorization': `Bearer ${token}`
        };
    
        addOrder(orderData, headers)
        .then(response => {
            const waMessage = `Halo, saya baru saja membuat pesanan dengan detail sebagai berikut:\n\n` +
                            `Jenis Ikan: ${orderData.jenisikan}\n` +
                            `Jumlah Ikan: ${orderData.jumlah}\n` +
                            `Ukuran: ${orderData.ukuran}\n` +
                            `Harga: Rp${orderData.hargaikan}\n` +
                            `Kategori: ${orderData.kategori}\n\n` +
                            `Terima kasih!`;

            const encodedMessage = encodeURIComponent(waMessage);
            const waNumber = '+6285861175890'; // Ganti dengan nomor WhatsApp tujuan
            const waURL = `https://wa.me/${waNumber}?text=${encodedMessage}`;

            alert('Pesanan berhasil dibuat. Segera konfirmasi!!');

            window.location.href = waURL;

            console.log('Order successful:', response);

            handleCloseModal();
        })
        .catch(error => {
            console.error('Error placing order:', error);
        });

    };

    const resetForm = () => {
        setSelectedCategory("Benih");
        setSelectedFish("");
        setSelectedSize("");
        setQuantity(0);
        setTotalPrice(0);
        setAvailableStock(0);
    };

    return (
        <div style={{ backgroundColor: '#F0F8FF' }}>
            <NavigationBar />
            <Headershow />
            <div style={{ height: '10px', backgroundColor: '#000060', margin: '0 0 20px 0' }}></div>
            <Container fluid>
                <div style={{ padding: '20px', backgroundColor: '#F0F8FF', textAlign: 'left' }}>
                    <h1 style={{ color: '#333', marginBottom: '20px', fontSize: '2rem' }}>Benih Ikan</h1>
                </div>
                <Row>
                    {ikanData.filter(item => item.kategori === "Benih").map((item, index) => (
                        <Col key={index} xs={12} md={6} lg={4}>
                            <div
                                className={css(styles.card)}
                                onClick={() => handleShowModal(item.jenis_ikan)}
                            >
                                <img src={`https://duanol.bbimijen.my.id/${item.foto_ikan}`} alt={item.jenis_ikan} className={css(styles.image)} />
                                <div className={css(styles.overlay)}>
                                    <h2>{item.jenis_ikan}</h2>
                                    <p>Harga: Rp {item.harga_ikan.toLocaleString()}/seratus ekor</p>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>

                <div style={{ padding: '20px', backgroundColor: '#F0F8FF', textAlign: 'left' }}>
                    <h1 style={{ color: '#333', marginBottom: '20px', fontSize: '2rem' }}>Ikan Konsumsi</h1>
                </div>
                <Row>
                    {ikanData.filter(item => item.kategori === "Konsumsi").map((item, index) => (
                        <Col key={index} xs={12} md={6} lg={4}>
                            <div
                                className={css(styles.card)}
                                onClick={() => handleShowModal(item.jenis_ikan)} // Hanya mengirim jenis ikan
                            >
                                <img src={`https://duanol.bbimijen.my.id/${item.foto_ikan}`} alt={item.jenis_ikan} className={css(styles.image)} />
                                <div className={css(styles.overlay)}>
                                    <h2>{item.jenis_ikan}</h2>
                                    <p>Stock: {item.total || 0} ekor</p>
                                    <p>Harga: Rp {item.harga_ikan.toLocaleString()}/kg</p>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>

            </Container>
            <Footer />
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Detail Pemesanan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        {selectedCategory === "Benih" && selectedFish && (
                            <Form.Group controlId="size">
                                <Form.Label>Pilih Ukuran:</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={selectedSize}
                                    onChange={handleSizeChange}
                                >
                                    <option value="">Pilih ukuran...</option>
                                    {benihData
                                        .filter(item => item.jenis_ikan === selectedFish)
                                        .map((fish, index) => (
                                            <option key={index} value={fish.ukuran}>{fish.ukuran}</option>
                                        ))}
                                </Form.Control>
                            </Form.Group>
                        )}

                        <Form.Group>
                            <Form.Label>Jumlah ikan tersedia:</Form.Label>
                            <p>
                                {selectedCategory === "Benih" && selectedSize
                                    ? benihData.find(item => item.jenis_ikan === selectedFish && item.ukuran === selectedSize)?.jumlah_ikan || 0
                                    : konsumsiData.find(item => item.jenis_ikan === selectedFish)?.jumlah_ikan || 0
                                } ekor
                            </p>
                        </Form.Group>

                        <Form.Group controlId="quantity">
                            <Form.Label>Jumlah beli:</Form.Label>
                            <Form.Control
                                type="number"
                                value={quantity}
                                onChange={handleQuantityChange}
                                min="1"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Total harga:</Form.Label>
                            <p>Rp {totalPrice.toLocaleString()}</p>
                        </Form.Group>

                        <Button
                            style={{ width: '100%', alignSelf: 'center' }}
                            className="mt-5"
                            variant="primary"
                            type="submit"
                            disabled={!selectedFish || quantity < 1 || (selectedCategory === "Benih" && !selectedSize)}
                        >
                            Buat Pesanan
                        </Button>
                    </Form>
                </Modal.Body>


            </Modal>
        </div>
    );
};

const styles = StyleSheet.create({
    card: {
        position: 'relative',
        border: '1px solid #ddd',
        borderRadius: '10px',
        overflow: 'hidden',
        cursor: 'pointer',
        margin: '10px 0',
        transition: 'transform 0.2s',
        ':hover': {
            transform: 'scale(1.05)'
        }
    },
    image: {
        width: '100%',
        height: 'auto'
    },
    overlay: {
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#fff',
        padding: '10px',
        textAlign: 'center'
    }
});

export default Shop;
