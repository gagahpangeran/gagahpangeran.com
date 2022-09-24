// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

const email = "gpr@gagahpangeran.com";

const HomePage = () => {
  return (
    <Layout>
      <main className="home">
        <div>
          <StaticImage
            src="../../static/logo.png"
            alt="GPR Logo"
            width={360}
            className="home__image"
          />
          <h1 className="home__title">Gagah Pangeran Rosfatiputra</h1>
          <h2 className="home__desc">Low Budget Programmer</h2>
          <h3 className="home__email">
            <a href={`mailto:${email}`}>{email}</a>
          </h3>
        </div>
      </main>
    </Layout>
  );
};

export const Head = () => <SEO title="Home" />;

export default HomePage;
