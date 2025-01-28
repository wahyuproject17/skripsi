import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import LogoUnnes from '../assets/logo_unnes.png'

const FooterAdmin = () => {
  return (
    <footer className={css(styles.footer)}>
      <p className={css(styles.footerText)}>
      © 2024 - {new Date().getFullYear()} | All Rights Reserved by {' '}
      <a
      href="https://www.unnes.ac.id/"
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: 'inline-block' }}
      >
      <img
      src={LogoUnnes}
      alt="UNNES Logo"
      style={{ width: '25px', height: 'auto' }}
      />
      </a>
      </p>
    </footer>
  );
};

export default FooterAdmin;

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#4682B4', // Warna latar belakang dengan transparansi
    color: '#fff',
    textAlign: 'center',
    padding: '15px 0',
    marginTop: 'auto', // Memastikan footer tetap di bawah jika konten tidak cukup
    position: 'relative', // Memastikan posisi footer relatif terhadap konten
    marginLeft: '250px',
    '@media (max-width: 768px)': {
      marginLeft: '0', // Menghapus margin kiri pada layar kecil
      padding: '10px 0', // Menyesuaikan padding agar lebih kecil di perangkat mobile
    },
  },
  footerText: {
    margin: 0,
    fontSize: '14px',
    '@media (max-width: 768px)': {
      fontSize: '12px', // Ukuran teks lebih kecil di perangkat mobile
    },
  },
});
