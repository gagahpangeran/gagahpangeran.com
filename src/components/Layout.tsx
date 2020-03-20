import React from "react";
import { ThemeProvider } from "emotion-theming";
import { StaticQuery, graphql } from "gatsby";

import styled, { theme } from "../utils/styled";

import Navbar from "./Navbar";
import "../styles/index.css";

const Wrapper = styled.div`
  max-width: 720px;
  margin: 64px auto 0;

  @media screen and (max-width: 720px) {
    padding: 0 16px;
  }
`;

const Footer = styled.footer`
  text-align: center;
  margin: 20px 0;

  span {
    color: #0177b0;
    cursor: pointer;
  }
`;

const Layout = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
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
    render={() => (
      <ThemeProvider theme={theme}>
        <Navbar />
        <Wrapper>{children}</Wrapper>
        <Footer>
          <h6>
            &copy; {new Date().getFullYear()} -{" "}
            <a href="https://gagahpangeran.com">GPR</a> -{" "}
            <span
              onClick={() => {
                window.scroll({
                  top: 0,
                  left: 0,
                  behavior: "smooth"
                });
              }}
            >
              Go To Top
            </span>
          </h6>
        </Footer>
      </ThemeProvider>
    )}
  />
);

export default Layout;
