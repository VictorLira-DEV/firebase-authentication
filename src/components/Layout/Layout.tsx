import React, { Fragment } from 'react';

import MainNavigation from './MainNavigation';

interface ILayoult {
  children: React.ReactNode
}

const Layout = (props: ILayoult) => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
