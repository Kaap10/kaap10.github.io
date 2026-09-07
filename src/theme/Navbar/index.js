import React from 'react';
import Navbar from '@theme-original/Navbar';
import { useLocation } from '@docusaurus/router';

export default function NavbarWrapper(props) {
  const location = useLocation();
  const path = location?.pathname || '';
  const clean = path.replace(/\/+$/, '') || '/';
  const isHome = clean === '/' || clean === '';

  if (isHome) {
    return null;
  }

  return <Navbar {...props} />;
}
