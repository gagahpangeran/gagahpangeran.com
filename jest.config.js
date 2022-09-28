module.exports = {
  collectCoverageFrom: ["src/**/*.(ts|tsx)", "!**/node_modules/**"],
  transform: {
    "^.+\\.[jt]sx?$": "<rootDir>/jest-preprocess.js"
  },
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,

    // From https://www.gatsbyjs.com/docs/how-to/testing/unit-testing/#2-creating-a-configuration-file-for-jest
    // Workaround for https://github.com/facebook/jest/issues/9771
    "^gatsby-page-utils/(.*)$": [
      `gatsby-page-utils/$1`,
      `gatsby-page-utils/dist/$1`
    ],
    "^gatsby-core-utils/(.*)$": [
      `gatsby-core-utils/$1`,
      `gatsby-core-utils/dist/$1`
    ],
    "^gatsby-plugin-utils/(.*)$": [
      `gatsby-plugin-utils/$1`,
      `gatsby-plugin-utils/dist/$1`
    ]
  },
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    url: `http://localhost:8000`
  },
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  transformIgnorePatterns: [
    `node_modules/(?!(gatsby|gatsby-script|gatsby-link)/)`
  ],
  globals: {
    __PATH_PREFIX__: ``
  },
  testMatch: ["<rootDir>/test/**/*.test.(ts|tsx)"],
  setupFilesAfterEnv: [`<rootDir>/jest.setup.js`],
  setupFiles: [`<rootDir>/loadershim.js`]
};
