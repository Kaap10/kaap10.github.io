import React from 'react';
import Content from '@theme-original/DocItem/Content';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import ViewCounter from '@site/src/components/Blog/ViewCounter';

export default function ContentWrapper(props) {
  const { metadata } = useDoc();
  // Generate a clean slug, e.g. "core-python", "flask", etc.
  const rawId = metadata?.id || metadata?.unversionedId || '';
  const slug = rawId.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  return (
    <>
      {slug && (
        <div style={{ marginBottom: '1.25rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ViewCounter slug={slug} increment={true} />
        </div>
      )}
      <Content {...props} />
    </>
  );
}
