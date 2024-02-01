import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { MdOutlineAdd } from 'react-icons/md';
import Button from '../ui/Button/Button';
import TaskList from '../TaskList/TaskList';
import Spinner from '../ui/Spinner/Spinner';
import { GET_TASKS } from '../../lib/queries';
import styles from './Dashboard.module.css';
import { filterTasksByStatus } from '../../lib/utils';
import TaskPanel from '../TaskPanel/TaskPanel';
import { useUpdateTask } from '../../hooks/useCustomMutation';
import { Query, Status, Task, TaskQuery } from '../../gql/graphql';

interface DashboardProps {
  statusOptions: Status[];
}

const Dashboard: React.FC<DashboardProps> = (props) => {
  const { loading, data } = useQuery<TaskQuery>(GET_TASKS);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<[boolean, Task | undefined]>([
    false,
    undefined,
  ]);
  const { taskAction: updateTask } = useUpdateTask();

  useEffect(() => {
    if (data) {
      const topLevelTasks = data.Task.filter((task) => !task.parentTaskId);
      setTasks(topLevelTasks);
    }
  }, [data]);

  const onDragEnd = (result: DropResult) => {
    const { draggableId, destination, source } = result;
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

  return loading ? (
    <Spinner dimensions={200} alt={'Logo spinner'} />
  ) : (
    <div className={styles.container}>
      <Button
        icon={MdOutlineAdd}
        text={'Add Task'}
        onClick={() => setActiveTask([true, undefined])}
        size='large'
      />
      <section className={styles.canvas}>
        <div className={styles.board}>
          <DragDropContext onDragEnd={onDragEnd}>
            {props.statusOptions.map((status) => (
              <TaskList
                key={status.id}
                status={status}
                tasks={filterTasksByStatus(tasks, status)}
                setTasks={setTasks}
                setActiveTask={setActiveTask}
              />
            ))}
          </DragDropContext>
        </div>
      </section>
      {activeTask[0] && (
        <TaskPanel
          task={activeTask[1]}
          setTasks={setTasks}
          setActiveTask={setActiveTask}
        />
      )}
    </div>
  );
};

export default Dashboard;
