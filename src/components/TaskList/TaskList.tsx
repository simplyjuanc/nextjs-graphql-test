import React from 'react';
import { NexusGenObjects } from '../../graphql-server/generated/types';
import styles from './TaskList.module.css';
import TaskCard from '../TaskCard/TaskCard';
import { Droppable } from '@hello-pangea/dnd';

interface TaskListProps {
  status: NexusGenObjects['Status'];
  tasks?: NexusGenObjects['Task'][];
}

const TaskList: React.FC<TaskListProps> = (props) => {
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
            {props.tasks?.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskList;
