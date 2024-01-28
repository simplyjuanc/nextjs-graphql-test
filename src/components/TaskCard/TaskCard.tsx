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
          <p>{props.task.title}</p>
          {props.task.description && <p>{props.task.description}</p>}
        </article>
      )}
    </Draggable>
  );
};

export default TaskCard;
