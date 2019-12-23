require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `Gagah Pangeran Rosfatiputra`,
    description: `Part Time Student, Full Time Learner`,
    author: `@gagahpangeran_`,
    image: "/logo.png",
    siteUrl: "https://blog.gagahpangeran.com",
    googleAnalytics: process.env.GOOGLE_ANALYTICS,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-tslint`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gagah Pangeran Rosfatiputra`,
        short_name: `GPR`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#000000`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        baseUrl: process.env.WORDPRESS_BASE_URL,
        protocol: process.env.WORDPRESS_PROTOCOL,
        hostingWPCOM: process.env.WORDPRESS_HOSTING_WPCOM === "true",
        useACF: process.env.WORDPRESS_USE_ACF === "true",
        includedRoutes: [
          "**/posts",
          "**/pages",
          "**/tags",
          "**/categories",
          "**/media",
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
