import React from 'react';
import { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { configureFakeBackend, authHeader, handleResponse } from '../Services/fack.backend';
import Callback from '../Auth/Callback';
import Loader from '../Layout/Loader';
import LayoutRoutes from '../Route/LayoutRoutes';
import Signin from '../Auth/Signin';
import PrivateRoute from './PrivateRoute';
import { classes } from '../Data/Layouts';
import { authRoutes } from './AuthRoutes';

// setup fake backend
configureFakeBackend();
const Routers = () => {
  const login = useState(JSON.parse(localStorage.getItem('login')!))[0];
  const [authenticated, setAuthenticated] = useState(false);
  const jwt_token = localStorage.getItem('token');
  const defaultLayoutObj: any = classes.find((item) => Object.values(item).pop() === 'compact-wrapper');
  const layout = localStorage.getItem('layout') || Object.keys(defaultLayoutObj).pop();

  useEffect(() => {
    let abortController = new AbortController();
    const requestOptions: any = { method: 'GET', headers: authHeader() };
    fetch('/users', requestOptions).then(handleResponse);

    setAuthenticated(JSON.parse(localStorage.getItem('authenticated')!));
    (console as any).ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
    (console as any).disableYellowBox = true;
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <BrowserRouter basename={'/react'}>
      <>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path={'/'} element={<PrivateRoute />}>
              {login || authenticated || jwt_token ? (
                <>
                  <Route path={`${process.env.PUBLIC_URL}`} element={<Navigate to={`${process.env.PUBLIC_URL}/pages/sample-page/${layout}`} />} />
                  <Route path={`/`} element={<Navigate to={`${process.env.PUBLIC_URL}/pages/sample-page/${layout}`} />} />
                </>
              ) : (
                ''
              )}
              <Route path={`/*`} element={<LayoutRoutes />} />
            </Route>
            <Route path={`${process.env.PUBLIC_URL}/callback`} element={<Callback />} />
            <Route path={`${process.env.PUBLIC_URL}/login`} element={<Signin />} />
            {authRoutes.map(({ path, Component }, i) => (
              <Route path={path} element={Component} key={i} />
            ))}
          </Routes>
        </Suspense>
      </>
    </BrowserRouter>
  );
};

export default Routers;
