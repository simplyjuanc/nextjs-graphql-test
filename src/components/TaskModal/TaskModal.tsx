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

  const handleEditTask = async () => {
    const res = await editTask({
      ...taskDetails,
      status: taskDetails.status.id,
    });
    props.setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        return task.id === res.updateTask.id ? res.updateTask : task;
      });
    });
  };

  const handleAddTask = async () => {
    const res = await addTask({
      title: taskDetails.title,
      description: taskDetails.description,
      status: 1,
    });
    props.setTasks((prevTasks) => [...prevTasks, res.createTask]);
  };

  const handleSubmit = async () => {
    if (!taskDetails || !taskDetails.title) return;

    props.task ? await handleEditTask() : await handleAddTask();
    closeModal();
  };

  const actionName = props.task ? 'Edit task' : 'Add task';
  return (
    <Modal setIsModalActive={props.setIsModalActive} title={actionName}>
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
