import React, { useEffect, useState } from 'react';
import NavigationBar from '../components/Navbar';
import '../style.css';
import Headershow from '../components/headerSlideshow';
import Slideshow from '../components/ImgSlideshow';
import { Button } from 'react-bootstrap';
import Footer from "../components/Footer";
import { fetchAllOrders, fetchJenisIkan } from '../api/Api';
import { motion, useAnimation } from 'framer-motion';

const Home = () => {
    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
    )

    useEffect(() => {
        window
            .matchMedia("(min-width: 768px)")
            .addEventListener('change', e => setMatches(e.matches));
    }, []);

    const slideStyle = {
        width: '100%',
        height: matches ? '90vh' : '50vh',
        backgroundColor: '#e6e6e6'
    }

    const controls = useAnimation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500) { // Adjust the scroll threshold as needed
                controls.start({ opacity: 1 });
            } else {
                controls.start({ opacity: 0 });
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [controls]);

    const [totalOrder, setTotalOrder] = useState(0);

    useEffect(() => {
        const fetchAllOrderData = async () => {
          try {
            const fetchedOrders = await fetchAllOrders(); // Menggunakan fetchOrders untuk mengambil data pesanan
            setTotalOrder(fetchedOrders);
            localStorage.setItem('totalOrder', JSON.stringify(fetchedOrders));
          } catch (error) {
            console.error(error);
          }
        };
        fetchAllOrderData();
      }, []);

    const [jenisIkan, setJenisIkan] = useState(0);
    useEffect(() => {
        const fetchJenisIkanData = async () => {
            try {
                const fetchedJenisIkan = await fetchJenisIkan(); // Menggunakan fetchTotalIkan untuk mengambil data total ikan
                setJenisIkan(fetchedJenisIkan);
                localStorage.setItem('jenisIkan', JSON.stringify(fetchedJenisIkan));
            } catch (error) {
                console.error(error);
            }
        };
        fetchJenisIkanData();
    }, []);

    return (
        <div>
            <NavigationBar />
            <div>
                <Headershow />
            </div>
            <div style={{ height: '10px', backgroundColor: '#000060', margin: '0 0 20px 0' }}></div>
            <div style={{ padding: '20px', backgroundColor: '#F0F8FF', textAlign: 'justify' }}>
                <h1 style={{ color: '#333', marginBottom: '20px', fontSize: '2rem' }}>Informasi Umum</h1>

                <div className="info-boxes">
                    <motion.div
                        className="info-box"
                        style={{ backgroundColor: '#37898C' }}
                        initial={{ opacity: 0 }}
                        animate={controls}
                        transition={{ duration: 0.5 }}
                    >
                        <h3>Jumlah SDM</h3>
                        <p>7</p>
                    </motion.div>
                    <motion.div
                        className="info-box"
                        style={{ backgroundColor: '#A52A2A' }}
                        initial={{ opacity: 0 }}
                        animate={controls}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h3>Jumlah Kolam</h3>
                        <p>80</p>
                    </motion.div>
                    <motion.div
                        className="info-box"
                        style={{ backgroundColor: '#003F88' }}
                        initial={{ opacity: 0 }}
                        animate={controls}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3>Jenis Ikan</h3>
                        <p>{jenisIkan}</p>
                    </motion.div>
                    <motion.div
                        className="info-box"
                        style={{ backgroundColor: '#D4D700' }}
                        initial={{ opacity: 0 }}
                        animate={controls}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h3>Jumlah Penjualan</h3>
                        <p>{totalOrder}</p>
                    </motion.div>
                </div>
                <div style={{ textAlign: 'left', backgroundColor: '#e6e6e6', minHeight: '5vh', padding: '10px', fontFamily: 'Arial, sans-serif', marginBottom: '10px'}}>
                    <h5>Menyediakan berbagai bibit ikan dan ikan konsumsi. <a link href='https://wa.me/+6285861175890'>klik disini</a> untuk informasi lainnya</h5>
                </div>
                <div style={{ textAlign: 'left', backgroundColor: '#e6e6e6', minHeight: '5vh', padding: '10px', fontFamily: 'Arial, sans-serif', marginBottom: '10px'}}>
                    <h1 style={{ color: '#333', marginBottom: '20px', fontSize: '2rem' }}>Jadwal Pelayanan</h1>
                    <div className="schedule-container">
                    <div className="schedule-item">
                    <span className="day">Senin</span>
                    <span className="time">08.00 - 16.00</span>
                    </div>
                    <div className="schedule-item">
                    <span className="day">Selasa</span>
                    <span className="time">08.00 - 16.00</span>
                    </div>
                    <div className="schedule-item">
                    <span className="day">Rabu</span>
                    <span className="time">08.00 - 16.00</span>
                    </div>
                    <div className="schedule-item">
                    <span className="day">Kamis</span>
                    <span className="time">08.00 - 16.00</span>
                    </div>
                    <div className="schedule-item">
                    <span className="day">Jumat</span>
                    <span className="time">08.00 - 16.00</span>
                    </div>
                    <div className="schedule-item">
                    <span className="day">Sabtu</span>
                    <span className="time">08.00 - 15.00</span>
                    </div>
                    <div className="schedule-item">
                    <span className="day">Minggu</span>
                    <span className="time">Tutup</span>
                    </div>
                </div>
                <p style={{color: 'red'}}><b>Khusus hari cuti buka sampai pukul 12.00 WIB</b></p>
                </div>

                <div style={{ textAlign: 'left', backgroundColor: '#e6e6e6', minHeight: '50vh', padding: '10px', fontFamily: 'Arial, sans-serif' }}>
                    <h1 style={{ color: '#333', marginBottom: '20px', fontSize: '2rem' }}>Fungsi Balai Benih Ikan</h1>
                    <p style={{ color: '#333', lineHeight: '1.6', fontSize: '1.1rem' }}>
                        1. Pelaksanaan produksi dan pendistribusian benih serta pengelolaan induk ikan;<br />
                        2. Pelaksanaan pembenihan ikan dan pembudidayaan ikan;<br />
                        3. Penerapan standar perbenihan;<br />
                        4. Pelaksanaan bimbingan teknik pengendalian hama, penyakit, lingkungan perbenihan dan budidaya ikan;<br />
                        5. Pelaksanaan pembinaan dan pengembangan kerjasama usaha perbenihan ikan;<br />
                        6. Pemberian pelayanan informasi dan bimbingan tentang pembenihan ikan kepada masyarakat;<br />
                        7. Pelaksanaan penarikan retribusi dan/atau pendapatan lain yang sah yang berkaitan dengan operasional Balai Benih Ikan Cangkiran untuk disetor ke Kas Daerah.
                    </p>
                </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                <Button 
                    onClick={() => {
                        const token = localStorage.getItem("token"); 
                        if (!token) {
                            alert('Anda harus login terlebih dahulu untuk melakukan pemesanan');
                            window.location.href = "/login"; // Jika belum login, arahkan ke halaman login
                        } else {
                            window.location.href = "/Shop"; // Jika sudah login, lanjut ke halaman Shop
                        }
                    }} 
                    style={{ backgroundColor: 'green', textAlign: 'center', fontSize: '20px', alignItems: 'center' }}
                >
                    Pesan Sekarang
                </Button>

                </div>
                <Footer />
            </div>
    )
}

export default Home;
