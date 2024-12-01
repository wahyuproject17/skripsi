import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const FooterAdmin = () => {
  return (
    <footer className={css(styles.footer)}>
      <p className={css(styles.footerText)}>
        © 2024 Balai Benih Mijen. All rights reserved.
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
    },
    footerText: {
      margin: 0,
      fontSize: '14px',
    },
  });
