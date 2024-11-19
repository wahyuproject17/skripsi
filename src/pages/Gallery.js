import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import Headershow from '../components/headerSlideshow';
import { fetchGaleriFoto } from '../api/Api'; // Sesuaikan dengan path yang benar ke api.js

function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const imageList = await fetchGaleriFoto();
        setImages(imageList);
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    loadImages();
  }, []);

  return (
    <div>
      <Navbar />
      <Headershow />
      <div style={{ height: '10px', backgroundColor: '#000060', margin: '0 0 20px 0' }}></div>
      <div style={{ padding: '20px', backgroundColor: '#F0F8FF', textAlign: 'left' }}>
        <h1 style={{ color: '#333', marginBottom: '20px', fontSize: '2rem' }}>Galeri Foto</h1>
      </div>
      <div className="row mt-2">
        {images.map((image, index) => (
          <div key={index} className="col-lg-4 col-md-12 mb-4 mb-lg-0">
            <img
              src={`https://duanol.bbimijen.my.id/${image.image_url}`} // Asumsi bahwa API mengembalikan objek dengan properti 'url'
              className="w-100 shadow-1-strong rounded mb-4"
              alt={image.alt || 'Image'} // Gunakan alt jika tersedia, jika tidak gunakan 'Image'
            />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Gallery;
