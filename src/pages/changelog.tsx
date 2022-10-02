// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text

import { GetServerData, Link, PageProps } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { getAllReleases } from "../utils/github";

type ServerDataProps = {
  allReleases: string[];
};

const title = "Changelog";
const desc = "All release changelog";

const renderChangelogList = (data: string[]) => {
  if (data.length === 0) {
    return <>There is no changelog.</>;
  }

  return (
    <ul className="changelog__list">
      {data.map(slug => (
        <li key={slug} className="changelog__item">
          <Link to={`/changelog/${slug}/`} className="changelog__link">
            <h4>{slug}</h4>
          </Link>
        </li>
      ))}
    </ul>
  );
};

const ChangelogPage: React.FC<
  PageProps<unknown, unknown, unknown, ServerDataProps>
> = ({ serverData }) => {
  return (
    <Layout mainTitle={title} subTitle={desc}>
      <main className="changelog">
        {renderChangelogList(serverData.allReleases)}
      </main>
    </Layout>
  );
};

export const Head = () => <SEO title={title} description={desc} />;

export default ChangelogPage;

export const getServerData: GetServerData<ServerDataProps> = async () => {
  const allReleases = await getAllReleases();

  return {
    status: 200,
    props: {
      allReleases
    }
  };
};
