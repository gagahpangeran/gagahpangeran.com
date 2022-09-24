// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { graphql, HeadProps, PageProps } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import PageNav from "../components/PageNav";
import SEO from "../components/SEO";
import { getChangelogData } from "../utils/data";

const getPageNavData = (slug?: string) => {
  if (slug === undefined) {
    return null;
  }

  return {
    slug,
    title: slug.split("/")[2]
  };
};

const Changelog: React.FC<PageProps<Queries.ChangelogTemplateQuery>> = ({
  data
}) => {
  const { title, html, newerSlug, olderSlug } = getChangelogData(data);

  return (
    <Layout mainTitle={title} subTitle={`All changes this release`}>
      <main className="html" dangerouslySetInnerHTML={{ __html: html }} />
      <PageNav
        newerData={getPageNavData(newerSlug)}
        olderData={getPageNavData(olderSlug)}
        suffix="Release"
      />
    </Layout>
  );
};

export const Head: React.FC<HeadProps<Queries.ChangelogTemplateQuery>> = ({
  data
}) => {
  const { title } = getChangelogData(data);
  return <SEO title={title} description={`Changelog ${title}`} />;
};

export default Changelog;

export const pageQuery = graphql`
  query ChangelogTemplate($id: String!, $newerId: String, $olderId: String) {
    changelog: markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
      html
    }
    newerChangelog: markdownRemark(id: { eq: $newerId }) {
      fields {
        slug
      }
    }
    olderChangelog: markdownRemark(id: { eq: $olderId }) {
      fields {
        slug
      }
    }
  }
`;
