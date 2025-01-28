import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const FooterAdmin = () => {
  return (
    <footer className={css(styles.footer)}>
      <p className={css(styles.footerText)}>
        © 2024 Balai Benih Mijen. All rights reserved.
      </p>
      <p>
          Created by{' '}
          <a
            href="https://www.unnes.ac.id/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-block' }}
            >
            <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/79/Logo_Universitas_Negeri_Semarang_%28UNNES%29.png"
            alt="UNNES Logo"
            style={{ width: '50px', height: 'auto' }}
            />
            </a>
        </p>
    </footer>
  );
};

export default FooterAdmin;

const styles = StyleSheet.create({
  footer: {
    backgroundColor: 'rgba(0, 0, 30, 0.5)', // Warna latar belakang dengan transparansi
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
