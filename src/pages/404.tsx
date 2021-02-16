import React from "react";
import { Link } from "gatsby";

import shinobu from "../images/shinobu.gif";

import Layout from "../components/Layout";
import SEO from "../components/SEO";

const NotFoundPage = () => (
  <Layout>
    <SEO title="Not found" />
    <h1>Sorry, not found :'(</h1>
    <h3 className="not-found__desc">
      Sorry, the page doesn't exist (or maybe I haven't build it yet :P )
    </h3>
    <Link className="not-found__link" to="/">
      Back to home
    </Link>
    <img className="not-found__image" src={shinobu} alt="Cute Shinobu" />
  </Layout>
);

export default NotFoundPage;
