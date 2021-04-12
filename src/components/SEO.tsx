// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import React from "react";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

interface Props {
  description?: string;
  lang?: string;
  meta?: [];
  title: string;
  thumbnail?: string;
}

function SEO({ description, lang = "en", meta = [], title, thumbnail }: Props) {
  const { site } = useStaticQuery<GatsbyTypes.SiteMetaDataQuery>(
    graphql`
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
    `
  );

  const siteMetadata = site?.siteMetadata as GatsbyTypes.SiteSiteMetadata;

  const metaDescription = description ?? siteMetadata.description;
  const metaImage = `${siteMetadata.siteUrl}/${
    thumbnail ?? siteMetadata.image
  }`;
  const metaTitle = `${title} | ${siteMetadata.title}`;

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title}
      titleTemplate={`%s | ${siteMetadata.title}`}
      meta={[
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
          name: `twitter:image`,
          content: metaImage
        }
      ].concat(meta)}
    />
  );
}

export default SEO;
