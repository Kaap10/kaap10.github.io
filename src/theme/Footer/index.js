import React from 'react';
import Footer from '@theme-original/Footer';
import { useLocation } from '@docusaurus/router';

export default function FooterWrapper(props) {
  const location = useLocation();
  const path = location?.pathname || '';
  const clean = path.replace(/\/+$/, '') || '/';
  const isHome = clean === '/' || clean === '';

  if (isHome) {
    return null;
  }

  return <Footer {...props} />;
}
