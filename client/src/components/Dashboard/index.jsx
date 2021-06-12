import React from 'react';
import { SideBar } from '../SideBar';
import './styles.css';

export const Dashboard = ({ id }) => {
  return (
    <div className='d-flex dashboard__container'>
      <SideBar id={id} />
    </div>
  );
};
