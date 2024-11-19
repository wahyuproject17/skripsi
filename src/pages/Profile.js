import React, { useEffect, useState } from 'react';
import NavigationBar from '../components/Navbar';
import '../style.css';
import Headershow from '../components/headerSlideshow';
import Footer from "../components/Footer";
import BBI from "../assets/bg1.jpg"
import { motion, useAnimation } from 'framer-motion';

const Profile = () => {
    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
    );

    useEffect(() => {
        window
            .matchMedia("(min-width: 768px)")
            .addEventListener('change', e => setMatches(e.matches));
    }, []);

    const slideStyle = {
        width: '100%',
        height: matches ? '90vh' : '50vh',
        backgroundColor: '#e6e6e6'
    };

    const controls = useAnimation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500) {
                controls.start({ opacity: 1 });
            } else {
                controls.start({ opacity: 0 });
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [controls]);

    return (
        <div>
            <NavigationBar />
            <Headershow />
            <div style={{ height: '10px', backgroundColor: '#000060', margin: '0 0 20px 0' }}></div>
            <div style={{ padding: '20px', backgroundColor: '#F0F8FF', textAlign: 'left' }}>
                <h1 style={{ color: '#333', marginBottom: '20px', fontSize: '2rem' }}>Profil BBI Mijen</h1>
                <img src={BBI} alt="profil" style={{width: '100%', height: 'auto', maxWidth: matches ? '800px' : '100%'}}/>
                <p style={{ color: '#333', lineHeight: '1.6', fontSize: '1.1rem' }}>
                    <b>Lokasi:</b> Tambangan, Mijen, Kota Semarang, Jawa Tengah 50215, Indonesia
                </p>
                <h5 style={{ color: '#333', marginBottom: '5px', fontSize: '1.1rem', fontWeight: 'bold' }}>Fungsi:</h5>
                <p style={{ color: '#333', lineHeight: '1.6', fontSize: '1.1rem' }}>
                    1. Pelaksanaan produksi dan pendistribusian benih serta pengelolaan induk ikan;<br />
                    2. Pelaksanaan pembenihan ikan dan pembudidayaan ikan;<br />
                    3. Penerapan standar perbenihan;<br />
                    4. Pelaksanaan bimbingan teknik pengendalian hama, penyakit, lingkungan perbenihan dan budidaya ikan;<br />
                    5. Pelaksanaan pembinaan dan pengembangan kerjasama usaha perbenihan ikan;<br />
                    6. Pemberian pelayanan informasi dan bimbingan tentang pembenihan ikan kepada masyarakat;<br />
                    7. Pelaksanaan penarikan retribusi dan/atau pendapatan lain yang sah yang berkaitan dengan operasional Balai Benih Ikan Cangkiran untuk disetor ke Kas Daerah.
                </p>
                <h5 style={{ color: '#333', marginBottom: '5px', fontSize: '1.1rem', fontWeight: 'bold' }}>Jenis ikan budidaya:</h5>
                <p style={{ color: '#333', lineHeight: '1.6', fontSize: '1.1rem' }}>
                    - Bibit ikan: Nila, Lele, Karper, Koi <br/>
                    - Ikan konsumsi : Nila, Karper, Lele
                </p>
                <h5 style={{ color: '#333', marginBottom: '5px', fontSize: '1.1rem', fontWeight: 'bold' }}>Sarana dan Pra-sarana:</h5>
                <p style={{ color: '#333', lineHeight: '1.6', fontSize: '1.1rem' }}>
                    - Kantor <br/>
                    - Hatchery indoor <br/>
                    - Hatchery outdoor <br/>
                    - Rumah dinas <br/>
                    - Mess <br/>
                    - Aula <br/>
                    - Mushola <br/>
                    - Rumah jaga <br/>
                    - Laboratorium <br/>
                    - Gudang pakan
                </p>
                <h5 style={{ color: '#333', marginBottom: '5px', fontSize: '1.1rem', fontWeight: 'bold' }}>Layanan:</h5>
                <p style={{ color: '#333', lineHeight: '1.6', fontSize: '1.1rem' }}>
                    - Penjualan benih <br/>
                    - Pemancingan ikan karper <br/>
                    - Kosultasi budidaya ikan
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
