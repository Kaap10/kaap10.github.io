import React from 'react';
import SearchBar from '@theme-original/SearchBar';
import { useLocation } from '@docusaurus/router';

function isBlogPath(pathname) {
  if (!pathname) return false;
  const clean = pathname.replace(/\/+$/, '') || '/';
  return clean === '/blogs' || clean.startsWith('/blogs/') || clean === '/blog' || clean.startsWith('/blog/');
}

export default function SearchBarWrapper(props) {
  const location = useLocation();
  const isBlogs = isBlogPath(location?.pathname);

  if (!isBlogs) {
    return null;
  }

  return <SearchBar {...props} />;
}
