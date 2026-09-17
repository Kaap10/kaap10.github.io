import React, { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';
import WorkspacePage from './workspace';

export default function ToolsPage() {
  const history = useHistory();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      history.replace('/workspace');
    }
  }, [history]);

  return <WorkspacePage />;
}