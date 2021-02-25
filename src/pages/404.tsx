// Copyright (c) GPR <gpr@gagahpangeran.com>. Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import React from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

const NotFoundPage = () => {
  const mainTitle = "Sorry, not found 😢";
  const subTitle =
    "The page doesn't exist (or maybe I haven't build it yet 😜)";

  return (
    <Layout mainTitle={mainTitle} subTitle={subTitle}>
      <SEO title="Not found" />
      <Link className="not-found__link" to="/">
        Back to home
      </Link>
    </Layout>
  );
};

export default NotFoundPage;
