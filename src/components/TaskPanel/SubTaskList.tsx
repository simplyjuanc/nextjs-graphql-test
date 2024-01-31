import React, { useEffect, useState } from 'react';
import { MdOutlineAdd } from 'react-icons/md';
import { useQuery } from '@apollo/client';
import { GET_SUB_TASKS } from '../../lib/queries';
import Spinner from '../ui/Spinner/Spinner';
import Button from '../ui/Button/Button';
import styles from './TaskPanel.module.css';
import {
  useCreateSubTask,
  useDeleteTask,
  useUpdateTask,
} from '../../hooks/useCustomMutation';
import SubTaskItem from './SubTaskItem';
import { GetSubTasksQuery, Task } from '../../gql/graphql';

interface SubTaskListProps {
  parentTaskId?: number;
}

export const SubTaskList: React.FC<SubTaskListProps> = (props) => {
  const [subTasks, setSubTasks] = useState<Task[]>([]);
  const { taskAction: createSubTask } = useCreateSubTask();
  const { taskAction: deleteTask } = useDeleteTask();
  const { taskAction: updateTask } = useUpdateTask();

  const { loading, data } = useQuery<GetSubTasksQuery>(GET_SUB_TASKS, {
    variables: { id: props.parentTaskId },
  });

  useEffect(() => {
    if (data) setSubTasks(data.getSubTasks);
  }, [data]);

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const updatedTasks = await Promise.all(
      subTasks.map(async (task) => {
        if (task.id !== id) return task;
        const newStatusId = e.target.checked ? 3 : 1;
        const updatedTask = await updateTask({
          ...task,
          [e.target.name]: e.target.value,
          status: newStatusId,
        });
        return updatedTask.updateTask;
      })
    );
    setSubTasks(updatedTasks);
  };

  const handleDelete = (id: number) => {
    setSubTasks((prev) => prev.filter((task) => task.id !== id));
    deleteTask({ id });
  };

  const handleAddSubTask = async () => {
    if (!props.parentTaskId) return;
    const subTask = await createSubTask({
      title: '',
      description: '',
      status: 1,
      parentTaskId: props.parentTaskId,
    });
    setSubTasks((prev) => [...prev, subTask.createSubTask]);
  };

  return loading ? (
    <Spinner dimensions={200} alt={'Logo spinner'} />
  ) : (
    <article className={styles.panelArticle}>
      <h3>Sub-tasks</h3>
      <div className={styles.subTaskList}>
        <div className={styles.gridContainer}>
          <div className={styles.gridHeader}></div>
          <div className={styles.gridHeader}>Title</div>
          <div className={styles.gridHeader}>Description</div>
          <div className={styles.gridHeader}>Due date</div>
        </div>
        <div className={styles.gridContainer}>
          {subTasks.length > 0 &&
            subTasks.map((task) => (
              <SubTaskItem
                key={task.id}
                task={task}
                handleChange={handleChange}
                handleDelete={handleDelete}
              />
            ))}
        </div>
      </div>
      <div className={styles.btnContainer}>
        <Button
          icon={MdOutlineAdd}
          size='small'
          justification='right'
          text='Add sub-task'
          onClick={handleAddSubTask}
        />
      </div>
    </article>
  );
};
