// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text

import { type Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkGithub from "remark-github";
import PageNav from "@/components/PageNav";
import Page from "@/templates/Page";
import { getOtherMetadata } from "@/utils/data";
import {
  getAllReleases,
  getChangelogVersionData,
  getGithubConstants,
  getReleaseContent
} from "@/utils/changelog";

interface Props {
  params: Promise<{ version: string }>;
}

const desc = "All changes in this release";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { version } = await params;

  return {
    title: version,
    description: desc,
    ...getOtherMetadata(version, desc)
  };
}

export default async function VersionPage({ params }: Props) {
  const { version } = await params;
  const content = await getReleaseContent(version);
  const allReleases = await getAllReleases();

  const { olderData, newerData } = getChangelogVersionData(
    version,
    allReleases
  );

  const { USER, REPO } = getGithubConstants();
  const repository = `${USER}/${REPO}`;

  return (
    <Page mainTitle={version} subTitle={desc}>
      <main className="markdown markdown--page-version">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, [remarkGithub, { repository }]]}
        >
          {content}
        </ReactMarkdown>
      </main>

      <PageNav newerData={newerData} olderData={olderData} size="small" />
    </Page>
  );
}
