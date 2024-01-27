import React from 'react';
import { MdOutlineAdd } from 'react-icons/md';
import { useQuery } from '@apollo/client';
import Button from '../ui/Button/Button';

import TaskList from '../TaskList/TaskList';
import Spinner from '../ui/Spinner';

import { GET_TASKS } from '../../lib/queries';
import styles from './Dashboard.module.css';
import {
  NexusGenFieldTypes,
  NexusGenObjects,
} from '../../graphql-server/generated/types';

interface DashboardProps {
  statusOptions: NexusGenObjects['Status'][];
}

const Dashboard: React.FC<DashboardProps> = (props) => {
  const { loading, error, data } =
    useQuery<NexusGenFieldTypes['Query']>(GET_TASKS);
  if (loading) return <Spinner />;
  if (error) return <p>Error :{error.message}(</p>;

  const filterTasksByStatus = (status: NexusGenObjects['Status']) => {
    return data.Task.filter((task) => task.status.value === status.value);
  };

  console.log(data);
  return (
    <div className={styles.container}>
      <Button
        icon={MdOutlineAdd}
        text={'Add Task'}
        onClick={() => console.log('click')}
      />
      <section className={styles.canvas}>
        <h2>Kanban Board</h2>
        <div className={styles.board}>
          {props.statusOptions.map((status) => (
            <TaskList
              key={status.id}
              heading={status.text}
              tasks={filterTasksByStatus(status)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
