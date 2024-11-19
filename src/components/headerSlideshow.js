import React, { useState, useEffect } from 'react';
import { Slide } from 'react-slideshow-image';
import { motion } from 'framer-motion';
import 'react-slideshow-image/dist/styles.css';
import { Bg1, Bg2, Bg3 } from "../assets/index";
import '../App.css';
import { fetchTulisan } from '../api/Api';

const Headershow = () => {
  const [matches, setMatches] = useState(window.matchMedia("(min-width: 768px)").matches);
  const [tulisanData, setTulisanData] = useState({ ucapan: '' });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleResize = () => setMatches(mediaQuery.matches);
    
    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  useEffect(() => {
    const storedUcapan = localStorage.getItem('ucapan');
    
    if (storedUcapan) {
      setTulisanData({ ucapan: storedUcapan });
    } else {
      fetchTulisan()
        .then(data => {
          const ucapan = data[0].ucapan;
          setTulisanData({ ucapan });
          localStorage.setItem('ucapan', ucapan);
        })
        .catch(error => {
          console.error('Error fetching tulisan:', error);
        });
    }
  }, []);

  const slideImages = [
    { url: Bg1, caption: 'Slide 1' },
    { url: Bg2, caption: 'Slide 2' },
    { url: Bg3, caption: 'Slide 3' },
  ];

  return (
    <motion.div
      className="image-container"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="slideshow">
        <Slide arrows={true} autoplay={true}>
          {slideImages.map((slideImage, index) => (
            <div key={index} style={{ height: '100vh' }}>
              <div
                className="slide-image"
                style={{ backgroundImage: `url(${slideImage.url})` }}
              >
                <div className="overlay"></div>
              </div>
            </div>
          ))}
        </Slide>
      </div>
      <div className="text-content">
        <h1><b>BALAI BENIH IKAN MIJEN</b></h1>
        {matches ? (
          <p className="large-text">
            {tulisanData.ucapan}
          </p>
        ) : (
          <p className="small-text">
            {tulisanData.ucapan}
          </p>
        )}
        <div className="button-container">
          <a href="/Profile" className="button">Baca Selengkapnya</a>
        </div>
      </div>
    </motion.div>
  );
};

export default Headershow;
