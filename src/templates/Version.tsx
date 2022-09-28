// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { GetServerData, HeadProps, PageProps } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { getReleaseContent } from "../utils/github";

type ServerDataProps = {
  version: string;
  content: string;
};

const desc = "All changes in this release";

const Version: React.FC<
  PageProps<unknown, unknown, unknown, ServerDataProps>
> = ({ serverData }) => {
  const { version } = serverData;

  return (
    <Layout mainTitle={version} subTitle={desc}>
      <main className="html">{version}</main>
    </Layout>
  );
};

export const Head: React.FC<HeadProps> = ({ location }) => {
  const [, , version] = location.pathname.split("/");
  return <SEO title={version} description={desc} />;
};

export default Version;

export const getServerData: GetServerData<ServerDataProps> = async ({
  params
}) => {
  const version = params?.version;

  if (typeof version === "string") {
    const content = await getReleaseContent(version);

    return {
      status: content == null ? 404 : 200,
      props: {
        version,
        content: content ?? ""
      }
    };
  }

  throw Error("Invalid version type");
};
