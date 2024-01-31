import { MdOutlineDeleteForever } from 'react-icons/md';
import Button from '../ui/Button/Button';
import styles from './TaskPanel.module.css';
import { Task } from '../../gql/graphql';

interface SubTaskItemProps {
  task: Task;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => Promise<void>;
  handleDelete: (id: number) => void;
}

const SubTaskItem: React.FC<SubTaskItemProps> = (props) => {
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.type = 'date';
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // e.target.type = e.target.value ? 'text' : 'date';
    e.target.type = 'text';
  };

  return (
    <>
      <div className={styles.gridItem}>
        <div className={styles.checkbox}>
          <input
            type='checkbox'
            name='status'
            checked={props.task.status.id === 3}
            onChange={(e) => props.handleChange(e, props.task.id)}
          />
          <Button
            icon={MdOutlineDeleteForever}
            onClick={() => props.handleDelete(props.task.id)}
            size='xs'
            color='danger'
          />
        </div>
      </div>
      <div className={styles.gridItem}>
        <input
          type='text'
          name='title'
          onChange={(e) => props.handleChange(e, props.task.id)}
          value={props.task.title || ''}
        />
      </div>
      <div className={styles.gridItem}>
        <input
          type='text'
          name='description'
          onChange={(e) => props.handleChange(e, props.task.id)}
          value={props.task.description || ''}
        />
      </div>
    </>
  );
};

export default SubTaskItem;
