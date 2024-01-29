import React from 'react';
import styles from './Header.module.css';
import Button from '../Button/Button';
import { BiDoorOpen } from 'react-icons/bi';

const Header = () => {
  return (
    <header>
      <div className={styles.header}>
        <h1>Welcome to the Task Manager</h1>
        <div className={styles.logout}>
          <p>Hi, [USERNAME]</p>
          <Button
            text='Logout'
            onClick={() => console.log()}
            size='small'
            icon={BiDoorOpen}
          />
        </div>
      </div>
      <div className={styles.title}>
        <h2>Kanban Board</h2>
      </div>
    </header>
  );
};

export default Header;
