import React from 'react';
import { IconType } from 'react-icons';
import styles from './Button.module.css';

interface ButtonProps {
  icon?: IconType;
  text?: string;
  onClick: () => void;
  size?: 'small' | 'medium' | 'large';
  color?: 'default' | 'secondary' | 'warning' | 'danger' | 'success';
  position?: 'absolute' | 'relative' | 'static';
  justification?: 'left' | 'right' | 'center';
}

const Button: React.FC<ButtonProps> = (props) => {
  const size = props.size || 'medium';
  const color = props.color || 'default';
  const position = props.position || 'static';
  const justification = props.justification || 'center';

  const btnStyle = [
    styles.btn,
    styles[`__${size}`],
    styles[`__${color}`],
    styles[`__${position}`],
    styles[`__${justification}`],
  ].join(' ');

  return (
    <button className={btnStyle} onClick={props.onClick}>
      {props.icon && <props.icon className={styles.btnIcon} />}
      {props.text && <span>{props.text}</span>}
    </button>
  );
};

export default Button;
