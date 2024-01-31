import React from 'react';
import styles from './TaskPanel.module.css';
import { TaskArticleProps } from './TaskPanel';

export const TaskDetails: React.FC<TaskArticleProps> = (props) => {
  return (
    <article className={styles.panelArticle}>
      <input
        type='text'
        name='title'
        onChange={props.handleChange}
        value={props.task?.title || 'Title...'}
        placeholder='Title...'
        className={styles.title}
      />

      <div className={styles.dateContainer}>
        <div className={styles.dateItem}>
          <p>Due by: </p>
          <input
            type='date'
            name='dueDate'
            className={styles.date}
            onChange={props.handleChange}
            value={
              props.task?.dueDate
                ? new Date(props.task.dueDate).toISOString().slice(0, 10)
                : ''
            }
          />
        </div>
        {props.task?.createdAt && (
          <div className={styles.dateItem}>
            <p>Created on: </p>
            <p>{new Date(props.task.createdAt).toLocaleDateString()}</p>
          </div>
        )}
      </div>
    </article>
  );
};
