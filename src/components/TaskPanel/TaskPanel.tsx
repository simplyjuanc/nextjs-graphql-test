import React, { useCallback, useEffect, useState } from 'react';
import { NexusGenObjects } from '../../graphql-server/generated/types';
import Spinner from '../ui/Spinner/Spinner';
import { useQuery } from '@apollo/client';
import { GET_SUB_TASKS } from '../../lib/queries';
import styles from './TaskPanel.module.css';
import overlayStyle from '../ui/Modal/Modal.module.css';
import BtnActions from '../ui/ButtonActions/BtnActionsProps';
import { ButtonProps } from '../ui/Button/Button';
import { TaskSubList } from './TaskSubList';
import { TaskDescription } from './TaskDescription';
import { TaskDetails } from './TaskDetails';
import Modal from '../ui/Modal/Modal';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import {
  useCreateTask,
  useDeleteTask,
  useUpdateTask,
} from '../../lib/mutations';

interface TaskPanelProps {
  task?: NexusGenObjects['Task'];
  setTasks: React.Dispatch<React.SetStateAction<NexusGenObjects['Task'][]>>;
  setActiveTask: React.Dispatch<
    React.SetStateAction<[boolean, NexusGenObjects['Task'] | undefined]>
  >;
}

export interface TaskArticleProps {
  task?: NexusGenObjects['Task'];
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

  /* TODO: Finish configuring subTask fetching
  const [subTasks, setSubTasks] = useState<NexusGenObjects['Task'][]>([]);
  const { loading, data } = useQuery<NexusGenFieldTypes['Query']['Task']>(
    GET_SUB_TASKS,
    { variables: { id: props.task.id } }
  );

  if (loading) return <Spinner />;
 */

  const handleDelete = () => {
    props.setTasks((prev) => prev.filter((task) => task.id !== props.task.id));
    deleteTask({ id: props.task.id });
  };

  const handleSave = async () => {
    console.log(taskDetails);
    if (!taskDetails?.title) return;
    console.log(taskDetails);

    if (!props.task) {
      const newTask = await createTask({
        title: taskDetails.title,
        description: taskDetails.description,
        status: 1,
      });
      props.setTasks((prevTasks) => [...prevTasks, newTask.createTask]);
    } else {
      const updatedTask = await updateTask({
        ...taskDetails,
        status: taskDetails.status.id,
      });
      console.log('updatedTask :>> ', updatedTask);
      props.setTasks((prevTasks) =>
        prevTasks.map((task) => {
          return task.id !== props.task.id ? task : updatedTask.updateTask;
        })
      );
    }

    props.setActiveTask([false, undefined]);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === 'dueDate') {
      e.target.value = new Date(e.target.value).toISOString();
    }

    console.log(e.target.name, e.target.value);
    setTaskDetails((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
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
      onClick: () => handleSave,
      justification: 'right',
    },
  ];

  return (
    <>
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
      <div
        className={overlayStyle.overlay}
        onClick={() => props.setActiveTask([false, undefined])}
      >
        <section className={styles.panel} onClick={(e) => e.stopPropagation()}>
          <TaskDetails task={taskDetails} handleChange={handleChange} />
          <TaskDescription task={taskDetails} handleChange={handleChange} />
          {/* <TaskSubList setSubTasks={setSubTasks} /> */}
          {taskDetails ? (
            <BtnActions buttons={actionBtns} />
          ) : (
            <BtnActions buttons={[actionBtns[1]]} />
          )}
        </section>
      </div>
    </>
  );
};

export default TaskPanel;
