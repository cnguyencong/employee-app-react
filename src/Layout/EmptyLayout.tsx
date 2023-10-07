import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

const EmptyLayout = ({ children, classNames, ...rest }: any) => {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};
export default EmptyLayout;
