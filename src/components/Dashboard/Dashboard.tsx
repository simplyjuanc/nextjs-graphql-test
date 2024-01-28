import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { DragDropContext, DragStart, DropResult } from '@hello-pangea/dnd';
import { MdOutlineAdd } from 'react-icons/md';
import Button from '../ui/Button/Button';
import TaskList from '../TaskList/TaskList';
import Spinner from '../ui/Spinner/Spinner';
import { GET_TASKS } from '../../lib/queries';
import styles from './Dashboard.module.css';
import { useUpdateTask } from '../../lib/mutations';
import { filterTasksByStatus } from '../../lib/utils';
import TaskModal from '../TaskModal/TaskModal';
import {
  NexusGenFieldTypes,
  NexusGenObjects,
} from '../../graphql-server/generated/types';

interface DashboardProps {
  statusOptions: NexusGenObjects['Status'][];
}

const Dashboard: React.FC<DashboardProps> = (props) => {
  const { loading, data } = useQuery<NexusGenFieldTypes['Query']>(GET_TASKS);
  const [tasks, setTasks] = useState<NexusGenObjects['Task'][]>([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const { taskAction: updateTask } = useUpdateTask();

  useEffect(() => {
    if (data) setTasks(data.Task);
  }, [data]);

  const onDragEnd = (result: DropResult) => {
    const { draggableId, destination, source } = result;
    console.log({ di: destination.index, si: source.index });
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

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

  const handleAddTask = () => setIsModalActive((prev) => !prev);

  return loading ? (
    <Spinner />
  ) : (
    <div className={styles.container}>
      <Button icon={MdOutlineAdd} text={'Add Task'} onClick={handleAddTask} />
      <section className={styles.canvas}>
        <h2>Kanban Board</h2>
        <div className={styles.board}>
          <DragDropContext onDragEnd={onDragEnd}>
            {props.statusOptions.map((status) => (
              <TaskList
                key={status.id}
                status={status}
                tasks={filterTasksByStatus(tasks, status)}
                setTasks={setTasks}
              />
            ))}
          </DragDropContext>
        </div>
      </section>
      {isModalActive && (
        <TaskModal setIsModalActive={setIsModalActive} setTasks={setTasks} />
      )}
    </div>
  );
};

export default Dashboard;
