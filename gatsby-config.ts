// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import dotenv from "dotenv";
import type { GatsbyConfig } from "gatsby";

dotenv.config({
  path: `.env`
});

export const siteMetadata: GatsbyConfig["siteMetadata"] = {
  title: `GPR`,
  description: `Low Budget Programmer`,
  image: "logo.png",
  siteUrl: "https://gagahpangeran.com"
};

export const trailingSlash: GatsbyConfig["trailingSlash"] = "always";

export const graphqlTypegen: GatsbyConfig["graphqlTypegen"] = {
  typesOutputPath: `types/generated-types.d.ts`
};

export const plugins: GatsbyConfig["plugins"] = [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/content`,
      name: `content`
    }
  },
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      excerpt_separator: "<!-- excerpt -->",
      plugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 700,
            showCaptions: true,
            backgroundColor: "none"
          }
        },
        {
          resolve: `gatsby-remark-responsive-iframe`,
          options: {
            wrapperStyle: `margin-bottom: 1.0725rem`
          }
        },
        {
          resolve: `gatsby-remark-autolink-headers`,
          options: {
            isIconAfterHeader: true,
            className: `markdown__header-link`
          }
        },
        {
          resolve: `gatsby-remark-katex`,
          options: {
            strict: `ignore`
          }
        },
        {
          resolve: `gatsby-remark-table-of-contents`,
          options: {
            fromHeading: 2,
            toHeading: 3,
            className: "markdown__toc"
          }
        },
        `gatsby-remark-prismjs`,
        `gatsby-remark-copy-linked-files`,
        `gatsby-remark-smartypants`,
        `gatsby-remark-external-links`
      ]
    }
  },
  `gatsby-plugin-image`,
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  `gatsby-plugin-sass`,
  `gatsby-plugin-catch-links`,
  `gatsby-plugin-typescript`,
  `gatsby-plugin-netlify`,
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `GPR's Blog`,
      short_name: `GPR's Blog`,
      start_url: `/home`,
      background_color: `#000000`,
      theme_color: `#000000`,
      display: `minimal-ui`,
      icon: `./static/logo.png` // This path is relative to the root of the site.
    }
  }
  // this (optional) plugin enables Progressive Web App + Offline functionality
  // To learn more, visit: https://gatsby.dev/offline
  // `gatsby-plugin-offline`,
];
