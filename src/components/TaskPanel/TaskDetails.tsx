import React, { useState } from 'react';
import styles from './TaskPanel.module.css';
import { TaskArticleProps } from './TaskPanel';

export const TaskDetails: React.FC<TaskArticleProps> = (props) => {
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.type = 'date';
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.type = e.target.value ? 'text' : 'date';
  };

  if (props.task?.dueDate) {
    console.log('typeof props.task.dueDate :>> ', typeof props.task.dueDate);
    console.log('props.task.dueDate :>> ', props.task.dueDate);
  }

  return (
    <article className={styles.panelArticle}>
      <input
        type='text'
        name='title'
        id='title'
        onChange={props.handleChange}
        value={props.task?.title || 'Title...'}
        placeholder='Title...'
        className={styles.title}
      />

      <div className={styles.dateContainer}>
        <div className={styles.dateItem}>
          <p>Due by: </p>
          <input
            type='text'
            name='dueDate'
            className={styles.date}
            onChange={props.handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={
              props.task?.dueDate
                ? new Date(props.task.dueDate).toLocaleDateString()
                : 'No due date'
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
