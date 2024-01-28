import React from 'react';
import { NexusGenObjects } from '../../graphql-server/generated/types';
import { Draggable } from '@hello-pangea/dnd';
import styles from './TaskCard.module.css';

interface TaskProps {
  index: number;
  task: NexusGenObjects['Task'];
}

const TaskCard: React.FC<TaskProps> = (props) => {
  return (
    <Draggable draggableId={props.task.id.toString()} index={props.index}>
      {(provided) => (
        <article
          className={styles.card}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h4>{props.task.title}</h4>
          {props.task.description && <p>{props.task.description}</p>}
          {props.task.createdAt && (
            <p>Created at: {new Date(props.task.createdAt).toLocaleString()}</p>
          )}
        </article>
      )}
    </Draggable>
  );
};

export default TaskCard;
