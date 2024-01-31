import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import styles from './TaskList.module.css';
import TaskCard from '../TaskCard/TaskCard';
import { Status, Task } from '../../gql/graphql';

interface TaskListProps {
  status: Status;
  tasks?: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setActiveTask: React.Dispatch<
    React.SetStateAction<[boolean, Task | undefined]>
  >;
}

const TaskList: React.FC<TaskListProps> = (props) => {
  const handleTaskClick = (task: Task) => {
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
