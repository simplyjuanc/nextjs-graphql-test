import React from 'react';
import { NexusGenObjects } from '../../graphql-server/generated/types';
import { Draggable } from '@hello-pangea/dnd';
import styles from './TaskCard.module.css';
import Button from '../ui/Button/Button';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { useDeleteTask } from '../../lib/mutations';

interface TaskCardProps {
  index: number;
  task: NexusGenObjects['Task'];
  onClick?: <T>(arg: T) => void;
  setTasks: React.Dispatch<React.SetStateAction<NexusGenObjects['Task'][]>>;
}

const TaskCard: React.FC<TaskCardProps> = (props) => {
  const { taskAction: deleteTask } = useDeleteTask();
  const handleDelete = () => {
    props.setTasks((prev) => prev.filter((task) => task.id !== props.task.id));
    deleteTask({ id: props.task.id });
  };

  return (
    <Draggable draggableId={props.task.id.toString()} index={props.index}>
      {(provided) => (
        <article
          className={styles.card}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={styles.btnContainer}>
            <Button
              icon={MdOutlineDeleteForever}
              onClick={handleDelete}
              size='small'
              position='absolute'
              justification='right'
              color='danger'
            />
          </div>

          <div className={styles.cardContent} onClick={props.onClick}>
            <h4 className={styles.title}>{props.task.title}</h4>
            {props.task.dueDate && (
              <p
                className={
                  props.task.status.id === 3 ? styles.dateCrossed : styles.date
                }
              >
                Due: {new Date(props.task.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </article>
      )}
    </Draggable>
  );
};

export default TaskCard;
