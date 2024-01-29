import React from 'react';
import styles from './Footer.module.css';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        Tech Assessment for{' '}
        <Link href={'https://www.portf.io/'} target='blank'>
          PortF.io
        </Link>
      </p>
      <div className={styles.footerCredits}>
        <p>Juan Vásquez</p>
        <p>January, 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
