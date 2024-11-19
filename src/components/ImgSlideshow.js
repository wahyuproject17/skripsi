import React, { useState, useEffect } from 'react';
import { Slide, Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { Img1, Img2, Img3, Img4, Img5 } from "../assets/index";

const Slideshow = () => {
  const [matches, setMatches] = useState(window.matchMedia("(min-width: 768px)").matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleResize = () => setMatches(mediaQuery.matches);

    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: matches ? '70vh' : '30vh',
    width: matches ? '60%' : '100%',
    margin: '0 auto',
  };

  const slideImages = [
    { url: Img1, caption: 'Slide 1' },
    { url: Img2, caption: 'Slide 2' },
    { url: Img3, caption: 'Slide 3' },
    { url: Img4, caption: 'Slide 4' },
    { url: Img5, caption: 'Slide 5' },

  ];

  return (
    <div className="slide-container z-1">
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Slideshow;
