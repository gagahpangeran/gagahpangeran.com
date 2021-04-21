// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text

import { graphql, Link, PageProps } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

const changelog: React.FC<PageProps<GatsbyTypes.ChangelogQuery>> = ({
  data
}) => {
  const allChangelog = data.allChangelog.nodes ?? [];

  const title = "Changelog";
  const desc = "All release changelog";

  return (
    <Layout mainTitle={title} subTitle={desc}>
      <SEO title={title} description={desc} />
      <main className="html">
        <ul>
          {allChangelog.map(({ fields: { slug } }) => (
            <li key={slug}>
              <Link to={slug}>{slug.split("/")[2]}</Link>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
};

export default changelog;

export const pageQuery = graphql`
  query Changelog {
    allChangelog: allMarkdownRemark(
      filter: {
        fields: {
          type: { eq: "changelog" }
          slug: { nin: ["/changelog/Home/", "/changelog/Next/"] }
        }
      }
      sort: { fields: fields___slug, order: DESC }
    ) {
      nodes {
        fields {
          slug
        }
      }
    }
  }
`;
