import React, { useCallback, useEffect, useState } from 'react';
import { useCreateTask, useUpdateTask } from '../../lib/mutations';
import styles from './TaskModal.module.css';
import { NexusGenObjects } from '../../graphql-server/generated/types';
import Button from '../ui/Button/Button';

interface TaskModalProps {
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  setTasks: React.Dispatch<React.SetStateAction<NexusGenObjects['Task'][]>>;
  task?: NexusGenObjects['Task'];
}

const TaskModal: React.FC<TaskModalProps> = (props) => {
  const { taskAction: addTask } = useCreateTask();
  const { taskAction: editTask } = useUpdateTask();
  const [taskDetails, setTasksDetails] = useState(props.task);
  console.log(taskDetails);

  const closeModal = useCallback(() => props.setIsModalActive(false), [props]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeModal();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTasksDetails((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    closeModal();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.modal__close} onClick={closeModal}>
          X
        </p>
        <h2>Add Task</h2>
        <form className={styles.form}>
          <div className={styles.form__item}>
            <label htmlFor='text' className={styles.form__label}>
              Title
            </label>
            <input
              type='text'
              name='title'
              id='title'
              className={styles.form__input}
              onChange={handleChange}
            />
          </div>
          <div className={styles.form__item}>
            <label htmlFor='description' className={styles.form__label}>
              Description
            </label>
            <textarea
              name='description'
              id='description'
              cols={20}
              rows={5}
              className={styles.form__input}
              onChange={handleChange}
            ></textarea>
          </div>
          <Button text='Add Task' onClick={handleSubmit} />
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
