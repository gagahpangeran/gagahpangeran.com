import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";

import Navbar from "./navbar";
import "../styles/index.css";

const Wrapper = styled.div`
  max-width: 720px;
  margin: 0 auto;
`;

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Navbar />
        <Wrapper>{children}</Wrapper>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
