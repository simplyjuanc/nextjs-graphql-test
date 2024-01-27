import React from 'react';
import { IconType } from 'react-icons';
import styles from './Button.module.css';

interface ButtonProps {
  icon?: IconType;
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button className={styles.btn} onClick={props.onClick}>
      {props.icon && <props.icon className={styles.btnIcon} />}
      <span>{props.text}</span>
    </button>
  );
};

export default Button;
