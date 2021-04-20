// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { graphql, PageProps } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

const Changelog: React.FC<PageProps<GatsbyTypes.ChangelogTemplateQuery>> = ({
  data
}) => {
  const slug = data.changelog?.fields.slug ?? "";
  const html = data.changelog?.html ?? "";

  const [, , title] = slug.split("/");

  return (
    <Layout mainTitle={title} subTitle={`All changes this release`}>
      <SEO title={title} description={`Changelog ${title}`} />
      <main className="main" dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
};

export default Changelog;

export const pageQuery = graphql`
  query ChangelogTemplate($id: String!) {
    changelog: markdownRemark(id: { eq: $id }) {
      id
      fields {
        slug
      }
      html
    }
  }
`;
