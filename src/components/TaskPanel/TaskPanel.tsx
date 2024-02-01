import React, { useCallback, useState } from 'react';
import styles from './TaskPanel.module.css';
import overlayStyle from '../ui/Modal/Modal.module.css';
import BtnActions from '../ui/ButtonActions/BtnActionsProps';
import { ButtonProps } from '../ui/Button/Button';
import { SubTaskList } from './SubTaskList';
import { TaskDescription } from './TaskDescription';
import { TaskDetails } from './TaskDetails';
import Modal from '../ui/Modal/Modal';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import {
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
} from '../../hooks/useCustomMutation';
import { Task } from '../../gql/graphql';

interface TaskPanelProps {
  task?: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setActiveTask: React.Dispatch<
    React.SetStateAction<[boolean, Task | undefined]>
  >;
}

export interface TaskArticleProps {
  task?: Task;
  handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
}

const TaskPanel: React.FC<TaskPanelProps> = (props) => {
  const [taskDetails, setTaskDetails] = useState(props.task);
  const [isModalActive, setIsModalActive] = useState(false);
  const { taskAction: createTask } = useCreateTask();
  const { taskAction: updateTask } = useUpdateTask();
  const { taskAction: deleteTask } = useDeleteTask();

  const closeModal = useCallback(() => setIsModalActive(false), []);
  useEscapeKey(closeModal);

  const handleDelete = () => {
    props.setTasks((prev) => prev.filter((task) => task.id !== props.task.id));
    deleteTask({ id: props.task.id });
    setIsModalActive(false);
    props.setActiveTask([false, undefined]);
  };

  const handleSave = async () => {
    if (!taskDetails?.title) return;

    if (!props.task) {
      const newTask = await createTask({
        ...taskDetails,
        status: 1,
      });
      props.setTasks((prevTasks) => [...prevTasks, newTask.createTask]);
    } else {
      const updatedTask = await updateTask({
        ...taskDetails,
        status: taskDetails.status.id,
      });
      props.setTasks((prevTasks) =>
        prevTasks.map((task) => {
          return task.id !== props.task.id ? task : updatedTask.updateTask;
        })
      );
    }

    setIsModalActive(false);
    props.setActiveTask([false, undefined]);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === 'dueDate') {
      setTaskDetails((prev) => {
        return {
          ...prev,
          [e.target.name]: new Date(e.target.value).toISOString(),
        };
      });
    } else {
      setTaskDetails((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
  };

  const actionBtns: ButtonProps[] = [
    {
      text: 'Delete',
      onClick: () => setIsModalActive(true),
      justification: 'left',
      color: 'danger',
    },
    {
      text: 'Save',
      onClick: handleSave,
      justification: 'right',
    },
  ];

  const confirmBtns: ButtonProps[] = [
    {
      text: 'Delete',
      onClick: handleDelete,
      justification: 'left',
      color: 'danger',
    },
    {
      text: 'Cancel',
      onClick: () => setIsModalActive(false),
      justification: 'right',
    },
  ];

  return (
    <>
      <div
        className={overlayStyle.overlay}
        onClick={() => props.setActiveTask([false, undefined])}
      >
        <section className={styles.panel} onClick={(e) => e.stopPropagation()}>
          <TaskDetails task={taskDetails} handleChange={handleChange} />
          <TaskDescription task={taskDetails} handleChange={handleChange} />
          <SubTaskList parentTaskId={taskDetails?.id} />
          {taskDetails ? (
            <BtnActions buttons={actionBtns} />
          ) : (
            <BtnActions buttons={[actionBtns[1]]} />
          )}
        </section>
      </div>
      {isModalActive && (
        <Modal setIsModalActive={setIsModalActive}>
          <div
            className={styles.modalConfirmation}
            onClick={(e) => e.stopPropagation()}
          >
            <p>Are you sure you want to delete this task?</p>
            <BtnActions buttons={confirmBtns} />
          </div>
        </Modal>
      )}
    </>
  );
};

export default TaskPanel;
