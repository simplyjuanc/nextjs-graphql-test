import React from 'react';
import { STATUS_OPTIONS } from '../../constants';
import Button from '../ui/Button/Button';
import { MdOutlineAdd } from 'react-icons/md';

const Dashboard = () => {
  return (
    <>
      <Button
        icon={MdOutlineAdd}
        text={'Add Task'}
        onClick={() => console.log('click')}
      />
    </>
  );
};

export default Dashboard;
