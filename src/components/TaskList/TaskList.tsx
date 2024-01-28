import React, { MouseEvent, useState } from 'react';
import { NexusGenObjects } from '../../graphql-server/generated/types';
import styles from './TaskList.module.css';
import TaskCard from '../TaskCard/TaskCard';
import { Droppable } from '@hello-pangea/dnd';
import TaskModal from '../TaskModal/TaskModal';

interface TaskListProps {
  status: NexusGenObjects['Status'];
  tasks?: NexusGenObjects['Task'][];
  setTasks: React.Dispatch<React.SetStateAction<NexusGenObjects['Task'][]>>;
}

const TaskList: React.FC<TaskListProps> = (props) => {
  const [isTaskActive, setIsTaskActive] = useState<boolean>(false);
  const [activeTask, setActiveTask] = useState<
    NexusGenObjects['Task'] | undefined
  >();

  const handleTaskClick = (task: NexusGenObjects['Task']) => {
    console.log('task', task);
    setIsTaskActive(true);
    setActiveTask(task);
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
            {props.tasks?.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onClick={() => handleTaskClick(task)}
                setTasks={props.setTasks}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {isTaskActive && (
        <TaskModal
          setIsModalActive={setIsTaskActive}
          setTasks={props.setTasks}
          task={activeTask}
        />
      )}
    </div>
  );
};

export default TaskList;
