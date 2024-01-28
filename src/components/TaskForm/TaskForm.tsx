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
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    props.onChange(event.target.name, event.target.value);
  };
  console.log({ task: props.task });
  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.form__item}>
        <label htmlFor='title' className={styles.label}>
          Title
        </label>
        <input
          type='text'
          name='title'
          id='title'
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
          id='description'
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
