import React from 'react';
import styles from './ButtonActions.module.css';
import Button, { ButtonProps } from '../Button/Button';

interface BtnActionsProps {
  buttons: ButtonProps[];
}

const BtnActions: React.FC<BtnActionsProps> = (props) => {
  return (
    <article className={styles.actionBtns}>
      {props.buttons.map((button, idx) => (
        <Button key={idx} {...button} />
      ))}
    </article>
  );
};

export default BtnActions;
