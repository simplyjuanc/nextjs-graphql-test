import React from 'react';
import styles from './TaskPanel.module.css';
import { TaskArticleProps } from './TaskPanel';

export const TaskDetails: React.FC<TaskArticleProps> = (props) => {
  const [dueDate, setDueDate] = React.useState(props.task.dueDate);
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setDueDate(e.target.value);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.type = 'date';
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    return (e.target.type = e.target.value ? 'text' : 'date');
  };

  return (
    <article className={styles.panelArticle}>
      <input
        type='text'
        name='title'
        id='title'
        placeholder={props.task.title}
        className={styles.title}
      />

      <div className={styles.dateContainer}>
        <div className={styles.dateItem}>
          <p>Due by: </p>
          <input
            type='date'
            className={styles.date}
            onChange={handleDateChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={dueDate && new Date(dueDate).toLocaleDateString()}
          />
        </div>
        <div className={styles.dateItem}>
          <p>Created on: </p>
          <p>{new Date(props.task.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </article>
  );
};
