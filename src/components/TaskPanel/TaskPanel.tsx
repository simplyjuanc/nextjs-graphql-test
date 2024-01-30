import React, { useEffect, useState } from 'react';
import { NexusGenObjects } from '../../graphql-server/generated/types';
import Spinner from '../ui/Spinner/Spinner';
import { useQuery } from '@apollo/client';
import { GET_SUB_TASKS } from '../../lib/queries';
import styles from './TaskPanel.module.css';
import overlayStyle from '../ui/Modal/Modal.module.css';
import TaskModal from '../TaskModal/TaskModal';
import BtnActions from '../ui/ButtonActions/BtnActionsProps';
import { ButtonProps } from '../ui/Button/Button';
import { TaskSubList } from './TaskSubList';
import { TaskDescription } from './TaskDescription';
import { TaskDetails } from './TaskDetails';

export interface TaskPanelProps {
  task: NexusGenObjects['Task'];
  setTasks: React.Dispatch<React.SetStateAction<NexusGenObjects['Task'][]>>;
  setActiveTask: React.Dispatch<
    React.SetStateAction<[boolean, NexusGenObjects['Task'] | undefined]>
  >;
}

const TaskPanel: React.FC<TaskPanelProps> = (props) => {
  const [taskDetails, setTaskDetails] = useState(props.task);
  const [isModalActive, setIsModalActive] = useState(false);
  /* TODO: Finish configuring subTask fetching
  const [subTasks, setSubTasks] = useState<NexusGenObjects['Task'][]>([]);
  const { loading, data } = useQuery<NexusGenFieldTypes['Query']['Task']>(
    GET_SUB_TASKS,
    { variables: { id: props.task.id } }
  );

  if (loading) return <Spinner />;
 */
  const handleDelete = () => setIsModalActive(true);
  const handleEdit = () => {
    props.setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        return task.id === props.task.id ? props.task : task;
      });
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDetails((prevTask) => {
      return { ...prevTask, description: e.target.value };
    });
  };

  const buttons: ButtonProps[] = [
    {
      text: 'Delete',
      onClick: handleDelete,
      justification: 'left',
      color: 'danger',
    },
    {
      text: 'Save',
      onClick: () => handleEdit,
      justification: 'right',
    },
  ];

  return (
    <div
      className={overlayStyle.overlay}
      onClick={() => {
        props.setActiveTask([false, undefined]);
      }}
    >
      <section className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <TaskDetails task={props.task} handleChange={handleChange} />
        <TaskDescription task={props.task} handleChange={handleChange} />
        {/* <TaskSubList setSubTasks={setSubTasks} /> */}
        <BtnActions buttons={buttons} />
      </section>
      {isModalActive && (
        <TaskModal
          setIsModalActive={setIsModalActive}
          setTasks={props.setTasks}
        />
      )}
    </div>
  );
};

export default TaskPanel;
export interface TaskArticleProps {
  task: NexusGenObjects['Task'];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
