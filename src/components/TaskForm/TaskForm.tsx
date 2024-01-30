import React from 'react';
import Button from '../ui/Button/Button';
import styles from './TaskForm.module.css';
import { NexusGenObjects } from '../../graphql-server/generated/types';

interface TaskFormProps {
  task?: NexusGenObjects['Task'];
  actionName: string;
  onChange: (name: string, value: string) => void;
  onSubmit: () => void;
}

const TaskForm: React.FC<TaskFormProps> = (props) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    props.onChange(e.target.name, e.target.value);
  };
  return (
    <form
      className={styles.form}
      onSubmit={(e) => e.preventDefault()}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.form__item}>
        <label htmlFor='title' className={styles.label}>
          Title
        </label>
        <input
          type='text'
          name='title'
          value={props.task?.title || ''}
          className={styles.form__input}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.form__item}>
        <label htmlFor='description' className={styles.label}>
          Description
        </label>
        <textarea
          name='description'
          cols={20}
          rows={5}
          value={props.task?.description || ''}
          className={styles.form__input}
          onChange={handleInputChange}
        />
      </div>
      <Button text={props.actionName} onClick={props.onSubmit} />
    </form>
  );
};

export default TaskForm;
