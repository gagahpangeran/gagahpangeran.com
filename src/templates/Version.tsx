// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { GetServerData, HeadProps, PageProps } from "gatsby";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkGithub from "remark-github";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { getGithubContants, getReleaseContent } from "../utils/github";

type ServerDataProps = {
  version: string;
  content: string;
  repository: string;
};

const desc = "All changes in this release";

const Version: React.FC<
  PageProps<unknown, unknown, unknown, ServerDataProps>
> = ({ serverData }) => {
  const { version, content, repository } = serverData;

  return (
    <Layout mainTitle={version} subTitle={desc}>
      <main className="html">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, [remarkGithub, { repository }]]}
        >
          {content}
        </ReactMarkdown>
      </main>
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
    const { USER, REPO } = getGithubContants();

    return {
      status: content == null ? 404 : 200,
      props: {
        version,
        content: content ?? "",
        repository: `${USER}/${REPO}`
      }
    };
  }

  throw Error("Invalid version type");
};
