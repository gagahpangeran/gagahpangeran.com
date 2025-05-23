// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text

import { type Metadata } from "next";
import PageNav from "@/components/PageNav";
import Page from "@/templates/Page";
import { getOtherMetadata } from "@/utils/metadata";
import {
  getNewerOlderVersion,
  getGithubConstants,
  getReleaseContent
} from "@/utils/changelog";
import PostMarkdown from "@/components/PostMarkdown";

// @ts-expect-error this is fork version, so there is not type declaration.
import remarkGithub from "remark-github";

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

  const { olderData, newerData } = await getNewerOlderVersion(version);

  const { USER, REPO } = getGithubConstants();
  const repository = `${USER}/${REPO}`;

  return (
    <Page mainTitle={version} subTitle={desc}>
      <main>
        <PostMarkdown
          className="markdown markdown--page-version"
          slug={`/changelog/${version}/`}
          remarkPlugins={[[remarkGithub, { repository }]]}
        >
          {content}
        </PostMarkdown>
      </main>

      <PageNav newerData={newerData} olderData={olderData} size="small" />
    </Page>
  );
}
