import React from 'react';
import { NexusGenObjects } from '../../graphql-server/generated/types';
import styles from './TaskPanel.module.css';

export const TaskSubList: React.FC<
  Record<string, NexusGenObjects['Task'][]>
> = (props) => {
  props;
  return (
    <article className={styles.panelArticle}>
      <h3>SubTasks</h3>
      {/* {subTasks.length > 0 && (
              <ul>
                {subTasks.map((task) => (
                  <li key={task.id}>{task.title}</li>
                ))}
              </ul>
            )} */}
    </article>
  );
};
