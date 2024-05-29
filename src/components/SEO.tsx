// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import React from "react";
import { useStaticQuery, graphql } from "gatsby";

interface Props {
  description?: string;
  meta?: [];
  title: string;
  thumbnail?: string;
}

function SEO({ description, meta = [], title, thumbnail }: Props) {
  const { site } = useStaticQuery<Queries.SiteMetaDataQuery>(graphql`
    query SiteMetaData {
      site {
        siteMetadata {
          title
          description
          siteUrl
          image
        }
      }
    }
  `);

  const siteMetadata = site?.siteMetadata;
  if (siteMetadata == null) {
    throw Error("Site metadata not found");
  }

  const {
    title: siteTitle,
    description: siteDescription,
    image: siteImage,
    siteUrl
  } = siteMetadata;

  const metaDescription = description ?? siteDescription;
  const metaImage = `${siteUrl}/${thumbnail ?? siteImage}`;
  const metaTitle = `${title} | ${siteTitle}`;

  const allMeta = [
    {
      name: `description`,
      content: metaDescription
    },
    {
      property: `og:title`,
      content: metaTitle
    },
    {
      property: `og:description`,
      content: metaDescription
    },
    {
      property: `og:type`,
      content: `website`
    },
    {
      property: `og:image`,
      content: metaImage
    },
    {
      name: `twitter:card`,
      content: `summary_large_image`
    },
    {
      name: `twitter:title`,
      content: metaTitle
    },
    {
      name: `twitter:description`,
      content: metaDescription
    },
    {
      name: `twitter:image:src`,
      content: metaImage
    }
  ].concat(meta);

  return (
    <>
      <title>{metaTitle}</title>
      {allMeta.map(metadata => (
        <meta key={metadata.name ?? metadata.property} {...metadata} />
      ))}
    </>
  );
}

export default SEO;
