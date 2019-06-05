import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";

import Navbar from "./navbar";
import "../styles/index.css";

const Wrapper = styled.div`
  max-width: 720px;
  margin: 64px auto 0;
`;

const Footer = styled.footer`
  text-align: center;
  margin: 20px 0;
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
        <Footer>
          <h6>
            &copy; {new Date().getFullYear()} -{" "}
            <a href="https://gagahpangeran.com">GPR</a>
          </h6>
        </Footer>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
