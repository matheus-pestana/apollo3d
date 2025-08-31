import React from 'react';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';
import styles from './footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        © {currentYear} APOLLO 3D. Todos os direitos reservados.
      </div>
      <div className={styles.socialIcons}>
        <a 
          href="https://www.instagram.com/apollo.3d_/" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Instagram da APOLLO 3D"
        >
          <FaInstagram size={24} />
        </a>
        <a 
          href="mailto:apollo3dson@gmail.com"
          aria-label="E-mail para contato com a APOLLO 3D"
        >
          <FaEnvelope size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;