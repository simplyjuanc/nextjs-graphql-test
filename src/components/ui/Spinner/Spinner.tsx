import Image from 'next/image';
import React from 'react';
import styles from './Spinner.module.css';
import Logo from '/public/logo.svg';

interface SpinnerProps {
  dimensions: number;
  alt: string;
}

const Spinner: React.FC<SpinnerProps> = (props) => {
  return (
    <Image
      src={Logo}
      alt={props.alt}
      width={props.dimensions}
      height={props.dimensions}
      className={styles.spinner}
    />
  );
};

export default Spinner;
