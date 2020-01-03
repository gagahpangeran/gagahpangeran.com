import React from "react";
import { Link } from "gatsby";
import styled from "../utils/styled";

import shinobu from "../images/shinobu.gif";

import Layout from "../components/Layout";
import SEO from "../components/SEO";

const PageDesc = styled.h3`
  color: ${props => props.theme.gray.light};
`;

const PageLink = styled(Link)`
  font-size: 20px;
  display: block;
  text-align: center;
  margin: 16px 0;
`;

const PageImage = styled.img`
  display: block;
  margin: 0 auto;
  max-width: 100%;
  height: auto;
`;

const NotFoundPage = () => (
  <Layout>
    <SEO title="Not found" />
    <h1>Sorry, not found :'(</h1>
    <PageDesc>
      Sorry, the page doesn't exist (or maybe I haven't build it yet :P )
    </PageDesc>
    <PageLink to="/">Back to home</PageLink>
    <PageImage src={shinobu} alt="Cute Shinobu" />
  </Layout>
);

export default NotFoundPage;
