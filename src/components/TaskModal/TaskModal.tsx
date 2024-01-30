import React, { useCallback, useState } from 'react';
import { useCreateTask } from '../../lib/mutations';
import { NexusGenObjects } from '../../graphql-server/generated/types';
import Modal from '../ui/Modal/Modal';
import TaskForm from '../TaskForm/TaskForm';
import { useEscapeKey } from '../../hooks/useEscapeKey';

interface TaskModalProps {
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  setTasks: React.Dispatch<React.SetStateAction<NexusGenObjects['Task'][]>>;
  task?: NexusGenObjects['Task'];
  action: 'add' | 'delete';
}

const TaskModal: React.FC<TaskModalProps> = (props) => {
  const { taskAction: createTask } = useCreateTask();
  const [taskDetails, setTaskDetails] = useState(props.task);

  const closeModal = useCallback(() => props.setIsModalActive(false), [props]);
  useEscapeKey(closeModal);

  const handleChange = (name: string, value: string) => {
    setTaskDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddTask = async () => {
    const res = await createTask({
      title: taskDetails.title,
      description: taskDetails.description,
      status: 1,
    });
    props.setTasks((prevTasks) => [...prevTasks, res.createTask]);
  };

  const handleSubmit = async () => {
    if (!taskDetails || !taskDetails.title) return;
    await handleAddTask();
    closeModal();
  };

  return (
    <Modal setIsModalActive={props.setIsModalActive} title='Add task'>
      <TaskForm
        task={taskDetails}
        onChange={handleChange}
        onSubmit={handleSubmit}
        actionName='Add task'
      />
    </Modal>
  );
};

export default TaskModal;
