import React from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button
          className={styles.modal__close}
          onClick={() => props.setIsModalActive(false)}
        >
          X
        </button>
        {props.title && <h2>{props.title}</h2>}
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
