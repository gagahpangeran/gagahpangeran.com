// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import React from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

const NotFoundPage = () => {
  const title = "Sorry, not found 😢";
  const desc = "The page doesn't exist (or maybe I haven't build it yet 😜)";

  return (
    <Layout mainTitle={title}>
      <SEO title="Not found" />
      <main className="not-found">
        <h3 className="not-found__desc">{desc}</h3>
        <Link className="not-found__link" to="/home/">
          Back to home
        </Link>
      </main>
    </Layout>
  );
};

export default NotFoundPage;
