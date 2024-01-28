import React, { useCallback, useEffect, useState } from 'react';
import { useCreateTask, useUpdateTask } from '../../lib/mutations';
import { NexusGenObjects } from '../../graphql-server/generated/types';
import Modal from '../ui/Modal/Modal';
import TaskForm from '../TaskForm/TaskForm';

interface TaskModalProps {
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  setTasks: React.Dispatch<React.SetStateAction<NexusGenObjects['Task'][]>>;
  task?: NexusGenObjects['Task'];
}

const TaskModal: React.FC<TaskModalProps> = (props) => {
  const { taskAction: addTask } = useCreateTask();
  const { taskAction: editTask } = useUpdateTask();
  const [taskDetails, setTaskDetails] = useState(props.task);
  console.log({ taskDetails });
  const closeModal = useCallback(() => props.setIsModalActive(false), [props]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeModal();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  const handleChange = (name: string, value: string) => {
    setTaskDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    closeModal();
  };

  const actionName = taskDetails ? 'Edit task' : 'Add task';
  return (
    <Modal onClose={closeModal} title={actionName}>
      <TaskForm
        task={taskDetails}
        onChange={handleChange}
        onSubmit={handleSubmit}
        actionName={actionName}
      />
    </Modal>
  );
};

export default TaskModal;
