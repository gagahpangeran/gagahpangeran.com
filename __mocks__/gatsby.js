const React = require("react");
const gatsby = jest.requireActual("gatsby");

module.exports = {
  ...gatsby,
  graphql: jest.fn(),
  Link: jest
    .fn()
    .mockImplementation(
      ({
        activeClassName,
        activeStyle,
        getProps,
        innerRef,
        partiallyActive,
        ref,
        replace,
        to,
        ...rest
      }) =>
        React.createElement("a", {
          ...rest,
          href: to
        })
    ),
  StaticQuery: jest.fn(),
  useStaticQuery: jest.fn().mockImplementation(_ => ({
    site: {
      siteMetadata: {
        title: `GPR's Blog`,
        description: `Part Time Student, Full Time Learner`,
        image: "logo.png",
        siteUrl: "https://blog.gagahpangeran.com"
      }
    }
  }))
};
