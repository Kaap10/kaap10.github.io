import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useThemeConfig} from '@docusaurus/theme-common';
import ThemedImage from '@theme/ThemedImage';

export default function Logo(props) {
  const {
    siteConfig: {title},
  } = useDocusaurusContext();
  const {
    navbar: {title: navbarTitle, logo},
  } = useThemeConfig();

  if (!logo?.src && (!navbarTitle || navbarTitle === '')) {
    return null;
  }

  const {imageClassName, titleClassName, ...propsRest} = props;
  const targetHref = logo?.href && logo.href !== '/' ? logo.href : '/portfolio';
  const logoLink = useBaseUrl(targetHref);

  const fallbackAlt = navbarTitle ? '' : title;
  const alt = logo?.alt ?? fallbackAlt;

  return (
    <Link
      to={logoLink}
      {...propsRest}
      {...(logo?.target && {target: logo.target})}>
      {logo?.src && (
        <ThemedImage
          className={logo.className}
          sources={{
            light: useBaseUrl(logo.src),
            dark: useBaseUrl(logo.srcDark || logo.src),
          }}
          height={logo.height}
          width={logo.width}
          alt={alt}
          style={logo.style}
        />
      )}
      {navbarTitle != null && navbarTitle !== '' && <b className={titleClassName}>{navbarTitle}</b>}
    </Link>
  );
}
