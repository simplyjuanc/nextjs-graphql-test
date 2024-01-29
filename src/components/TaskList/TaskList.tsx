import React from 'react';
import { NexusGenObjects } from '../../graphql-server/generated/types';
import { Droppable } from '@hello-pangea/dnd';
import styles from './TaskList.module.css';
import TaskCard from '../TaskCard/TaskCard';

interface TaskListProps {
  status: NexusGenObjects['Status'];
  tasks?: NexusGenObjects['Task'][];
  setTasks: React.Dispatch<React.SetStateAction<NexusGenObjects['Task'][]>>;
  setActiveTask: React.Dispatch<
    React.SetStateAction<[boolean, NexusGenObjects['Task'] | undefined]>
  >;
}

const TaskList: React.FC<TaskListProps> = (props) => {
  const handleTaskClick = (task: NexusGenObjects['Task']) => {
    props.setActiveTask([true, task]);
  };

  return (
    <div className={styles.column}>
      <div className={styles.taskList__header}>
        <h3>{props.status.text}</h3>
        <p className={styles.taskList__counter}>{props.tasks.length}</p>
      </div>
      <Droppable droppableId={props.status.id.toString()}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            className={styles.taskList}
            {...provided.droppableProps}
          >
            {props.tasks?.map((task, idx) => (
              <TaskCard
                key={task.id}
                task={task}
                index={idx}
                onClick={() => handleTaskClick(task)}
                setTasks={props.setTasks}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskList;
