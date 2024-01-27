import { Task } from '@prisma/client';
import React from 'react';
import { NexusGenObjects } from '../../graphql-server/generated/types';

interface TaskListProps {
  heading: string;
  tasks?: NexusGenObjects['Task'][];
}

const TaskList: React.FC<TaskListProps> = (props) => {
  return (
    <div>
      <h3>{props.heading}</h3>
      <div>
        {props.tasks?.map((task) => (
          <div key={task.id}>{task.title}</div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
