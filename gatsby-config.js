module.exports = {
  siteMetadata: {
    title: `Gagah Pangeran Rosfatiputra`,
    description: `Part Time Student, Full Time Learner`,
    author: `@gagahpangeran_`,
    image: "logo.png",
    siteUrl: "https://blog.gagahpangeran.com"
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
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
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 480,
              showCaptions: true
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-typescript`,
    {
      resolve: "gatsby-plugin-codegen",
      options: {
        localSchemaFile: `./types/schema.json`,
        watch: process.env.NODE_ENV === "development",
        addTypename: true,
        output: `./types/generated-types.d.ts`,
        outputFlat: true
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gagah Pangeran Rosfatiputra`,
        short_name: `GPR`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#000000`,
        display: `minimal-ui`,
        icon: `src/images/logo.png` // This path is relative to the root of the site.
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
};
