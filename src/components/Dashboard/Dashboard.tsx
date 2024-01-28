import React, { useEffect, useState } from 'react';
import { MdOutlineAdd } from 'react-icons/md';
import { useQuery } from '@apollo/client';
import Button from '../ui/Button/Button';
import TaskList from '../TaskList/TaskList';
import Spinner from '../ui/Spinner';
import { DragDropContext, DragStart, DropResult } from '@hello-pangea/dnd';
import { GET_TASKS } from '../../lib/queries';
import styles from './Dashboard.module.css';
import {
  NexusGenFieldTypes,
  NexusGenObjects,
} from '../../graphql-server/generated/types';
import { useUpdateTask } from '../../lib/mutations';

interface DashboardProps {
  statusOptions: NexusGenObjects['Status'][];
}

const Dashboard: React.FC<DashboardProps> = (props) => {
  const { loading, data } = useQuery<NexusGenFieldTypes['Query']>(GET_TASKS);
  const [tasks, setTasks] = useState<NexusGenObjects['Task'][]>([]);
  const { updateTask } = useUpdateTask();

  useEffect(() => {
    if (data) setTasks(data.Task);
  }, [data]);

  const onDragStart = (result: DragStart) => {};

  const onDragEnd = (result: DropResult) => {
    const { draggableId, destination } = result;
    if (!destination) return;

    const updatedTasks = tasks.map((task) => {
      if (task.id.toString() !== draggableId) return task;
      const newStatusId = parseInt(destination.droppableId);
      const newStatus = props.statusOptions.find(
        (status) => status.id === newStatusId
      );

      updateTask({ ...task, status: newStatusId });

      return {
        ...task,
        status: newStatus ? newStatus : task.status,
      };
    });
    setTasks(updatedTasks);
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className={styles.container}>
      <Button
        icon={MdOutlineAdd}
        text={'Add Task'}
        onClick={() => console.log('click')}
      />
      <section className={styles.canvas}>
        <h2>Kanban Board</h2>
        <div className={styles.board}>
          <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            {props.statusOptions.map((status) => (
              <TaskList
                key={status.id}
                status={status}
                tasks={filterTasksByStatus(tasks, status)}
              />
            ))}
          </DragDropContext>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

function filterTasksByStatus(
  tasks: NexusGenObjects['Task'][],
  status: NexusGenObjects['Status']
) {
  return tasks.filter((task) => task.status.value === status.value);
}
