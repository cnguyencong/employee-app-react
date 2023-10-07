import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from './Routes';
import AppLayout from '../Layout/Layout';
import EmptyLayout from '../Layout/EmptyLayout';

const LayoutRoutes = () => {
  return (
    <>
      <Routes>
        {routes.map(({ path, Component }, i) => (
          <Fragment key={i}>
          <Route element={process.env.NODE_ENV === 'development' ? <EmptyLayout /> : <EmptyLayout />} key={i}>
            <Route path={path} element={Component} />
          </Route>
          </Fragment>
        ))}
      </Routes>
    </>
  );
};

export default LayoutRoutes;